import React from 'react'
import { useEffect, useState } from "react"
import "./PreviousOrder.css"
function SearchOrders({ onSearch }){
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search your orders here"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        Search Orders
      </button>
    </form>
  )
}
function OrderItem({ order }){
  return (
    <div className="order-item">
      <div className="order-image">
        <img src={order.imageUrl || "/placeholder.svg"} alt={order.name} />
      </div>

      <div className="order-details">
        <h3 className="order-name">{order.name}</h3>
        <div className="order-specs">
          {order.color && <p>Color: {order.color}</p>}
          {order.size && <p>Size: {order.size}</p>}
        </div>
      </div>

      <div className="order-right">
        <p className="order-price">₹{order.price}</p>
        <div className="delivery-status">
          <span className="status-dot"></span>
          <span>Delivered on {order.deliveredOn}</span>
        </div>
        <p className="delivery-text">Your item has been delivered</p>
        <button className="review-button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          Rate & Review Product
        </button>
      </div>
    </div>
  )
}
function PreviousOrder() {
  const [orders, setOrders] = useState([ {
    id: "1",
    name: "realme Buds 2 Wired",
    price: 558,
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OklqpFV27W9y08PrgZFLDoat8Z6sEU.png",
    color: "Green",
    deliveredOn: "Jan 21",
    isDelivered: true,
  }])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async (search) => {
    setLoading(true)
    try {
      const data = await getOrders(search)
      setOrders(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="orders-container">
      <SearchOrders onSearch={(query) => fetchOrders(query)} />
      {loading ? (
        <div className="loading-text">Loading orders...</div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
          {orders.length === 0 && <div className="no-orders">No orders found</div>}
        </div>
      )}
    </div>
  )
}

export default PreviousOrder