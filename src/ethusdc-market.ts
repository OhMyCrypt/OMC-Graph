import {
  OrderCanceled as OrderCanceledEvent,
  OrderPlaced as OrderPlacedEvent,
  Paused as PausedEvent,
  TradeExecuted as TradeExecutedEvent,
  Unpaused as UnpausedEvent
} from "../generated/ETHUSDCMarket/ETHUSDCMarket"
import {
  OrderCanceled,
  OrderPlaced,
  Paused,
  TradeExecuted,
  Unpaused
} from "../generated/schema"

export function handleOrderCanceled(event: OrderCanceledEvent): void {
  let entity = new OrderCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ETHUSDCMarket_id = event.params.id
  entity.td = event.params.td
  entity.t1 = event.params.t1
  entity.t2 = event.params.t2
  entity.t1a = event.params.t1a
  entity.t2a = event.params.t2a
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderPlaced(event: OrderPlacedEvent): void {
  let entity = new OrderPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ETHUSDCMarket_id = event.params.id
  entity.isActive = event.params.isActive
  entity.td = event.params.td
  entity.t1 = event.params.t1
  entity.t2 = event.params.t2
  entity.t1a = event.params.t1a
  entity.t2a = event.params.t2a
  entity.p = event.params.p
  entity.oT = event.params.oT

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTradeExecuted(event: TradeExecutedEvent): void {
  let entity = new TradeExecuted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.seller = event.params.seller
  entity.t1 = event.params.t1
  entity.t2 = event.params.t2
  entity.t1a = event.params.t1a
  entity.t2a = event.params.t2a
  entity.p = event.params.p
  entity.timestamp = event.params.timestamp
  entity.buyOrderID = event.params.buyOrderID
  entity.sellOrderID = event.params.sellOrderID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
