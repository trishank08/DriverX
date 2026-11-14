import { Check, X } from 'lucide-react'
import { formatPrice } from '../data/cars'

const rows = [
  ['Price', (c) => formatPrice(c.price)], ['Body type', (c) => c.type], ['Fuel', (c) => c.fuel], ['Mileage / range', (c) => c.mileage], ['Power', (c) => c.power], ['Engine', (c) => c.specs.engine], ['Transmission', (c) => c.specs.transmission], ['Seats', (c) => c.specs.seats], ['Drive', (c) => c.specs.drive],
]

export default function CompareModal({ cars, onClose }) {
  if (!cars.length) return null
  const lowest = Math.min(...cars.map(c => c.price))
  return <div className="fixed inset-0 z-[60] overflow-y-auto bg-ink/55 p-3 backdrop-blur-sm sm:p-8">
    <div className="mx-auto max-w-6xl overflow-hidden rounded-[30px] bg-paper shadow-2xl reveal">
      <div className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-8"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-black/45">DriveX lab</p><h2 className="text-2xl font-extrabold tracking-tight">Your comparison</h2></div><button onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full bg-white hover:bg-lime"><X /></button></div>
      <div className="overflow-x-auto p-4 sm:p-8"><div className="min-w-[680px]"><div className="grid" style={{ gridTemplateColumns: `150px repeat(${cars.length}, minmax(190px, 1fr))` }}>
        <div />
        {cars.map(car => <div key={car.id} className="px-3 pb-5"><div className="overflow-hidden rounded-2xl" style={{ backgroundColor: car.accent }}><img src={car.image} alt="" className="h-28 w-full object-cover mix-blend-multiply" /></div><p className="mt-3 text-xs font-bold uppercase text-black/45">{car.brand}</p><h3 className="font-extrabold">{car.model}</h3></div>)}
        {rows.map(([label, getter], index) => <div className="contents" key={label}>
          <div className={`border-t border-black/10 py-4 text-sm font-bold text-black/50 ${index % 2 ? 'bg-black/[.02]' : ''}`}>{label}</div>
          {cars.map(car => <div key={`${label}-${car.id}`} className={`border-t border-black/10 px-3 py-4 text-sm font-semibold ${index % 2 ? 'bg-black/[.02]' : ''}`}>{getter(car)} {label === 'Price' && car.price === lowest && <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-lime px-2 py-0.5 text-[10px] font-extrabold"><Check size={11}/>Best</span>}</div>)}
        </div>)}
      </div></div></div>
    </div>
  </div>
}
