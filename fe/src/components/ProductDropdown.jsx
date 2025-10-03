import { useState, useEffect, useRef } from 'react'
import { getProducts } from '../api/productApi'
import formatNumber from '../utils/formatNumber'

function ProductDropdown({ value, onChange }) {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)
  const [selectedName, setSelectedName] = useState("")

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    if (!query) {
      setProducts([])
      return
    }
    let active = true
    setLoading(true)
    getProducts(query)
      .then(data => { if (active) setProducts(data) })
      .catch(console.error)
      .finally(() => setLoading(false))
    return () => { active = false }
  }, [query])

  useEffect(() => {
    if (!value) return
    const found = products.find(p => p.id === value)
    if (found && found.name !== selectedName) setSelectedName(found.name)
  }, [value, products, selectedName])

  return (
    <div className="kyzn-dd" ref={containerRef}>
      <button type="button" onClick={() => setOpen(v => !v)} className="kyzn-dd-toggle">
        <span className="truncate">{selectedName || 'Select product'}</span>
        <svg className="" style={{ width: 16, height: 16, color: '#6b7280' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
      </button>

      {open && (
        <div className="kyzn-dd-menu">
          <div className="kyzn-dd-search">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search product..."
              className="kyzn-input"
            />
          </div>

          <div className="kyzn-dd-items">
            {loading && <div className="px-3 py-2" style={{ fontSize: 12, color: '#6b7280' }}>Loading...</div>}
            {!loading && products.length === 0 && query && (
              <div className="px-3 py-2" style={{ fontSize: 12, color: '#6b7280' }}>No results</div>
            )}
            {products.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => { onChange(p.id); setSelectedName(p.name); setOpen(false); setQuery("") }}
                className="kyzn-dd-item"
              >
                <img src={p.image_url} alt={p.name} width={32} height={32} style={{ borderRadius: 6, objectFit: 'cover' }} />
                <div style={{ minWidth: 0 }}>
                  <div className="truncate" style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>Stock: {p.stock} · Price: {formatNumber(p.price)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDropdown
