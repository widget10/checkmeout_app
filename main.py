from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import PricingModel
from views import CheckoutView
from controllers import CheckoutController

app = FastAPI(title="Supermarket Checkout API")

class CheckoutRequest(BaseModel):
    skus: str

class CheckoutResponse(BaseModel):
    total: int

@app.post("/checkout", response_model=CheckoutResponse)
async def checkout(request: CheckoutRequest):
    model = PricingModel()
    view = CheckoutView()
    controller = CheckoutController(model, view)
    total = controller.calculate_total(request.skus)
    if total == -1:
        raise HTTPException(status_code=400, detail="Invalid input")
    return {"total": total}

@app.get("/")
async def root():
    return {"message": "Welcome to the Supermarket Checkout API"}