import { Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OrderCanceled as OrderCanceledEvent,
  OrderPlaced as OrderPlacedEvent,
  Paused as PausedEvent,
  TradeExecuted as TradeExecutedEvent,
  Unpaused as UnpausedEvent
} from "../generated/USDCDAIMarket/USDCDAIMarket"
import {
  ActiveOrder,
  OrderCanceled,
  OrderPlaced,
  Paused,
  TradeExecuted,
  Unpaused
} from "../generated/schema"

export function handleOrderCanceled(event: OrderCanceledEvent): void {
  let orderCanceleds = OrderCanceled.load(getIdFromEventParams(event.params.id))
    let activeOrders = ActiveOrder.load(getIdFromEventParams(event.params.id))
  
    if(!orderCanceleds){
      orderCanceleds = new OrderCanceled(getIdFromEventParams(event.params.id))
    }
  
  orderCanceleds.oid = event.params.id
  orderCanceleds.td = event.params.td
  orderCanceleds.t1 = event.params.t1
  orderCanceleds.t2 = event.params.t2
  orderCanceleds.t1a = event.params.t1a
  orderCanceleds.t2a = event.params.t2a
  orderCanceleds.timestamp = event.params.timestamp
  orderCanceleds.transactionHash = event.transaction.hash
  activeOrders!.isActive = false

  orderCanceleds.save()
  activeOrders!.save()
}

export function handleOrderPlaced(event: OrderPlacedEvent): void {
    let orderPlaceds = OrderPlaced.load(getIdFromEventParams(event.params.id));
    let activeOrders = ActiveOrder.load(getIdFromEventParams(event.params.id));
    if(!orderPlaceds){
      orderPlaceds = new OrderPlaced(getIdFromEventParams(event.params.id))
    }
    if(!activeOrders){
      activeOrders = new ActiveOrder(getIdFromEventParams(event.params.id))
    }

  orderPlaceds.oid = event.params.id
  orderPlaceds.isActive = event.params.isActive
  orderPlaceds.td = event.params.td
  orderPlaceds.t1 = event.params.t1
  orderPlaceds.t2 = event.params.t2
  orderPlaceds.t1a = event.params.t1a
  orderPlaceds.t2a = event.params.t2a
  orderPlaceds.p = event.params.p
  orderPlaceds.timestamp = event.block.timestamp
  orderPlaceds.oT = event.params.oT
  orderPlaceds.transactionHash = event.transaction.hash
  activeOrders.oid = event.params.id
  activeOrders.isActive = event.params.isActive
  activeOrders.td = event.params.td
  activeOrders.t1 = event.params.t1
  activeOrders.t2 = event.params.t2
  activeOrders.t1a = event.params.t1a
  activeOrders.t2a = event.params.t2a
  activeOrders.p = event.params.p
  activeOrders.oT = event.params.oT
  activeOrders.timestamp = event.block.timestamp
  activeOrders.transactionHash = event.transaction.hash
  
  activeOrders.save()
  orderPlaceds.save()
}

export function handleTradeExecuted(event: TradeExecutedEvent): void {
  let tradeExecuteds = TradeExecuted.load(getIdFromEventParamsTE(event.params.buyOrderID,event.params.sellOrderID))
  if(!tradeExecuteds){
    tradeExecuteds = new TradeExecuted(getIdFromEventParamsTE(event.params.buyOrderID,event.params.sellOrderID))
  }
  
  tradeExecuteds.buyer = event.params.buyer
  tradeExecuteds.seller = event.params.seller
  tradeExecuteds.t1 = event.params.t1
  tradeExecuteds.t2 = event.params.t2
  tradeExecuteds.t1a = event.params.t1a
  tradeExecuteds.t2a = event.params.t2a
  tradeExecuteds.p = event.params.p
  tradeExecuteds.timestamp = event.params.timestamp
  tradeExecuteds.buyOrderID = event.params.buyOrderID
  tradeExecuteds.sellOrderID = event.params.sellOrderID
  tradeExecuteds.transactionHash = event.transaction.hash

  // Modification de activeOrders pour buyOrderID
  let activeOrders = ActiveOrder.load(getIdFromEventParams(event.params.buyOrderID));
  if (activeOrders) {
    if(activeOrders.t1a == event.params.t1a){
    activeOrders.isActive = false ;
    activeOrders.save();
    activeOrders = ActiveOrder.load(getIdFromEventParams(event.params.sellOrderID))
    if(activeOrders){
      if(activeOrders.t1a == event.params.t1a){
        activeOrders.isActive = false;
        activeOrders.save();
      } else {
        activeOrders.t1a = activeOrders.t1a.minus(event.params.t1a)
        activeOrders.t2a = activeOrders.t2a.minus(event.params.t2a)
        activeOrders.save()
      }
    }
    } else if(activeOrders.t1a > event.params.t1a){
      activeOrders.t1a = activeOrders.t1a.minus(event.params.t1a)
      activeOrders.t2a = activeOrders.t1a.times(activeOrders.p.div(BigInt.fromI32(10000)))
      activeOrders.save()
      activeOrders = ActiveOrder.load(getIdFromEventParams(event.params.sellOrderID))
      if(activeOrders){
        if(activeOrders.t1a == event.params.t1a){
          activeOrders.isActive = false;
          activeOrders.save()
        }
      }
    } 
}

  tradeExecuteds.save()
}

function getIdFromEventParams(id: BigInt): string {
  return id.toHexString()
}

function getIdFromEventParamsTE(buyOrderID: BigInt, sellOrderID: BigInt): string {
  return buyOrderID.toHexString() + sellOrderID.toHexString()
}

export function handlePaused(event: PausedEvent): void {

}


export function handleUnpaused(event: UnpausedEvent): void {

}
