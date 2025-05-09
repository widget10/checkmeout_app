from typing import Dict, List, Tuple

class PricingModel:
    def __init__(self):
        self.unit_prices: Dict[str, int] = {
            'A': 50,
            'B': 30,
            'C': 20,
            'D': 15
        }
        self.offers: Dict[str, List[Tuple[int, int]]] = {
            'A': [(3, 130)],
            'B': [(2, 45)]
        }

    def get_unit_price(self, item: str) -> int:
        return self.unit_prices.get(item, 0)

    def get_offers(self, item: str) -> List[Tuple[int, int]]:
        return self.offers.get(item, [])

    def is_valid_item(self, item: str) -> bool:
        return item in self.unit_prices