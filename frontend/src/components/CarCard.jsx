import { Heart, Plus, Star } from 'lucide-react'
import { emergencyCarPhoto, formatPrice } from '../data/cars'

export default function CarCard({ car, isSaved, isCompared, onSave, onCompare, onOpen, compact = false }) {
  const recoverImage = (event) => {
    const image = event.currentTarget
    if (!image.dataset.photoFallback && car.fallbackImage) {
      image.dataset.photoFallback = 'used'
      image.src = car.fallbackImage
      return
    }
    image.onerror = null
    image.src = emergencyCarPhoto
  }

  return (
    <article className={`car-card group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${compact ? '' : 'min-w-[286px]'}`}>
      <div className="relative h-48 overflow-hidden" style={{ backgroundColor: car.accent }}>
        <div className="absolute left-4 top-4 z-10 rounded-full bg-white/80 px-3 py-1 text-xs font-bold backdrop-blur">{car.type}</div>
        <button onClick={() => onSave(car.id)} aria-label="Save car" className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${isSaved ? 'bg-ink text-lime' : 'bg-white/80 hover:bg-white'}`}><Heart size={18} fill={isSaved ? 'currentColor' : 'none'} /></button>
        <button onClick={() => onOpen?.(car)} aria-label={`View ${car.brand} ${car.model}`} className="absolute inset-0 z-[1] h-full w-full cursor-pointer"><img onError={recoverImage} className="car-img h-full w-full object-cover" src={car.image} alt={`${car.brand} ${car.model}`} /></button>
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="relative z-10 bg-white p-5">
        <div className="mb-4 flex items-start justify-between gap-3"><button onClick={() => onOpen?.(car)} className="text-left"><p className="text-xs font-bold uppercase tracking-[.14em] text-black/45">{car.brand} · {car.year}</p><h3 className="mt-1 text-lg font-extrabold tracking-tight hover:underline">{car.model}</h3></button><span className="flex items-center gap-1 text-sm font-bold"><Star size={15} fill="#C8F04B" strokeWidth={0} />{car.rating}</span></div>
        <div className="mb-5 flex items-center gap-3 border-y border-black/5 py-3 text-xs font-semibold text-black/55"><span>{car.fuel}</span><i className="h-1 w-1 rounded-full bg-black/25" /><span>{car.mileage}</span></div>
        <div className="flex items-center justify-between"><p className="text-lg font-extrabold">{formatPrice(car.price)} <span className="text-xs font-medium text-black/45">onwards</span></p><button onClick={() => onCompare(car)} className={`grid h-10 w-10 place-items-center rounded-full transition ${isCompared ? 'bg-lime text-ink' : 'bg-mist hover:bg-lime'}`} aria-label="Add to comparison"><Plus size={20} className={isCompared ? 'rotate-45' : ''} /></button></div>
      </div>
    </article>
  )
}
