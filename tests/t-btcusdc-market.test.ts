import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { OrderCanceled } from "../generated/schema"
import { OrderCanceled as OrderCanceledEvent } from "../generated/tBTCUSDCMarket/tBTCUSDCMarket"
import { handleOrderCanceled } from "../src/t-btcusdc-market"
import { createOrderCanceledEvent } from "./t-btcusdc-market-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let td = Address.fromString("0x0000000000000000000000000000000000000001")
    let t1 = Address.fromString("0x0000000000000000000000000000000000000001")
    let t2 = Address.fromString("0x0000000000000000000000000000000000000001")
    let t1a = BigInt.fromI32(234)
    let t2a = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let newOrderCanceledEvent = createOrderCanceledEvent(
      id,
      td,
      t1,
      t2,
      t1a,
      t2a,
      timestamp
    )
    handleOrderCanceled(newOrderCanceledEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OrderCanceled created and stored", () => {
    assert.entityCount("OrderCanceled", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "td",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "t1",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "t2",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "t1a",
      "234"
    )
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "t2a",
      "234"
    )
    assert.fieldEquals(
      "OrderCanceled",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
