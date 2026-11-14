import { ArrowRight, Check, Plus, X } from 'lucide-react'
import { formatPrice } from '../data/cars'

export default function CompareDrawer({ cars, onRemove, onClose, onCompare }) {
  if (!cars.length) return null
  return <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-4xl overflow-hidden rounded-[26px] border border-white/30 bg-ink p-3 text-white shadow-2xl backdrop-blur-lg float-in">
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex shrink-0 items-center gap-2 px-2"><span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink"><Check size={18} /></span><div><p className="text-sm font-extrabold">Compare cars</p><p className="text-xs text-white/55">{cars.length} of 4 selected</p></div></div>
      <div className="min-w-0 flex-1"><div className="flex max-w-full gap-2 overflow-x-auto pb-1">{cars.map((car) => <div key={car.id} className="flex shrink-0 items-center gap-2 rounded-2xl bg-white/10 py-1.5 pl-1.5 pr-2 text-xs"><img src={car.image} alt="" className="h-9 w-12 rounded-xl object-cover" /><span className="max-w-24 truncate font-bold">{car.brand} {car.model}</span><button onClick={() => onRemove(car.id)} className="text-white/60 hover:text-white"><X size={14} /></button></div>)}{cars.length < 4 && <div className="grid h-12 min-w-12 place-items-center rounded-2xl border border-dashed border-white/30 text-white/50"><Plus size={18} /></div>}</div></div>
      <button onClick={onCompare} className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-lime px-5 py-3 text-sm font-extrabold text-ink hover:bg-[#d8fa6f]">Compare now <ArrowRight size={16} /></button>
      <button onClick={onClose} className="hidden p-2 text-white/50 sm:block"><X size={18} /></button>
    </div>
  </div>
}
