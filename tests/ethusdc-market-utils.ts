import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  OrderCanceled,
  OrderPlaced,
  Paused,
  TradeExecuted,
  Unpaused
} from "../generated/ETHUSDCMarket/ETHUSDCMarket"

export function createOrderCanceledEvent(
  id: BigInt,
  td: Address,
  t1: Address,
  t2: Address,
  t1a: BigInt,
  t2a: BigInt,
  timestamp: BigInt
): OrderCanceled {
  let orderCanceledEvent = changetype<OrderCanceled>(newMockEvent())

  orderCanceledEvent.parameters = new Array()

  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("td", ethereum.Value.fromAddress(td))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("t1", ethereum.Value.fromAddress(t1))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("t2", ethereum.Value.fromAddress(t2))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("t1a", ethereum.Value.fromUnsignedBigInt(t1a))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam("t2a", ethereum.Value.fromUnsignedBigInt(t2a))
  )
  orderCanceledEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return orderCanceledEvent
}

export function createOrderPlacedEvent(
  id: BigInt,
  isActive: boolean,
  td: Address,
  t1: Address,
  t2: Address,
  t1a: BigInt,
  t2a: BigInt,
  p: BigInt,
  oT: boolean
): OrderPlaced {
  let orderPlacedEvent = changetype<OrderPlaced>(newMockEvent())

  orderPlacedEvent.parameters = new Array()

  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("isActive", ethereum.Value.fromBoolean(isActive))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("td", ethereum.Value.fromAddress(td))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("t1", ethereum.Value.fromAddress(t1))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("t2", ethereum.Value.fromAddress(t2))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("t1a", ethereum.Value.fromUnsignedBigInt(t1a))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("t2a", ethereum.Value.fromUnsignedBigInt(t2a))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("p", ethereum.Value.fromUnsignedBigInt(p))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("oT", ethereum.Value.fromBoolean(oT))
  )

  return orderPlacedEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTradeExecutedEvent(
  buyer: Address,
  seller: Address,
  t1: Address,
  t2: Address,
  t1a: BigInt,
  t2a: BigInt,
  p: BigInt,
  timestamp: BigInt,
  buyOrderID: BigInt,
  sellOrderID: BigInt
): TradeExecuted {
  let tradeExecutedEvent = changetype<TradeExecuted>(newMockEvent())

  tradeExecutedEvent.parameters = new Array()

  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("t1", ethereum.Value.fromAddress(t1))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("t2", ethereum.Value.fromAddress(t2))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("t1a", ethereum.Value.fromUnsignedBigInt(t1a))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("t2a", ethereum.Value.fromUnsignedBigInt(t2a))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam("p", ethereum.Value.fromUnsignedBigInt(p))
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "buyOrderID",
      ethereum.Value.fromUnsignedBigInt(buyOrderID)
    )
  )
  tradeExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "sellOrderID",
      ethereum.Value.fromUnsignedBigInt(sellOrderID)
    )
  )

  return tradeExecutedEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}
