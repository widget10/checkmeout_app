from collections import defaultdict
from typing import Union
from models import PricingModel
from views import CheckoutView

class CheckoutController:
    def __init__(self, model: PricingModel, view: CheckoutView):
        self.model = model
        self.view = view

    def validate_input(self, skus: str) -> bool:
        if not isinstance(skus, str) or not all(c.isalpha() for c in skus):
            return False
        return all(self.model.is_valid_item(item) for item in skus)

    def calculate_total(self, skus: str) -> int:
        if not self.validate_input(skus):
            return self.view.display_error()

        cart = defaultdict(int)
        for item in skus:
            cart[item] += 1

        total = 0
        for item, quantity in cart.items():
            remaining = quantity
            for qty, offer_price in sorted(self.model.get_offers(item), reverse=True):
                if remaining >= qty:
                    bundles = remaining // qty
                    total += bundles * offer_price
                    remaining -= bundles * qty
            total += remaining * self.model.get_unit_price(item)

        return self.view.display_total(total)