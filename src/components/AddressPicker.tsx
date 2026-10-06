import React, { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import { AddressSuggestion, calculateAddressTravel, searchAddresses } from '../data/addresses';

export interface AddressTravel {
  address: AddressSuggestion;
  distanceKm: number;
  fee: number;
}

export function AddressPicker({ onChange }: { onChange: (travel: AddressTravel | null) => void }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [selected, setSelected] = useState<AddressSuggestion | null>(null);
  const [travel, setTravel] = useState<AddressTravel | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const request = useRef<AbortController | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selected || query.trim().length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setBusy(true);
      setMessage('');
      try {
        const results = await searchAddresses(query.trim(), controller.signal);
        if (controller.signal.aborted) return;
        setSuggestions(results);
        setMessage(results.length ? '' : 'Aucune adresse trouvée. Ajoutez le numéro, la rue et le code postal.');
      } catch {
        if (!controller.signal.aborted) setMessage('Recherche indisponible. Réessayez dans un instant.');
      } finally {
        if (!controller.signal.aborted) setBusy(false);
      }
    }, 350);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query, selected]);

  useEffect(() => () => request.current?.abort(), []);

  const choose = async (address: AddressSuggestion) => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setSelected(address);
    setQuery(address.label);
    setSuggestions([]);
    setOpen(false);
    setBusy(true);
    setMessage('');
    input.current?.setCustomValidity('Attendez le calcul du trajet.');
    try {
      const result = await calculateAddressTravel(address, controller.signal);
      if (controller.signal.aborted) return;
      const calculated = { address, ...result };
      setTravel(calculated);
      onChange(calculated);
      input.current?.setCustomValidity('');
    } catch {
      if (!controller.signal.aborted) {
        setMessage('Le trajet ne peut pas être calculé. Réessayez ou choisissez une autre adresse.');
        input.current?.setCustomValidity('Le trajet doit être calculé avant de réserver.');
      }
    } finally {
      if (!controller.signal.aborted) setBusy(false);
    }
  };

  return <div className="space-y-3">
    <div className="relative">
      <label htmlFor="intervention-address" className="text-xs uppercase tracking-wider font-semibold text-[#25D366] block mb-1.5">
        Adresse complète d’intervention *
      </label>
      <input id="intervention-address" ref={input} type="text" required autoComplete="off"
        placeholder="Numéro, rue et ville ou code postal"
        value={query} role="combobox" aria-expanded={open && suggestions.length > 0}
        aria-controls="address-suggestions" aria-autocomplete="list"
        onFocus={() => setOpen(true)}
        onBlur={event => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) setOpen(false); }}
        onKeyDown={event => {
          if (event.key === 'Escape') setOpen(false);
          if (event.key === 'Enter' && !selected) event.preventDefault();
          if (event.key === 'ArrowDown' && suggestions.length) {
            event.preventDefault();
            (event.currentTarget.parentElement?.querySelector('li button') as HTMLButtonElement | null)?.focus();
          }
        }}
        onChange={event => {
          request.current?.abort();
          setQuery(event.target.value);
          setSelected(null);
          setTravel(null);
          setSuggestions([]);
          setBusy(false);
          setMessage('');
          setOpen(true);
          onChange(null);
          event.target.setCustomValidity('Sélectionnez une adresse dans les suggestions pour calculer les frais.');
        }}
        className="w-full bg-black/60 border border-white/15 focus:border-[#25D366] text-white text-xs rounded-xl p-3 focus:outline-none" />
      {open && suggestions.length > 0 && <ul id="address-suggestions" role="listbox"
        className="absolute left-0 right-0 top-full mt-1 bg-[#141720] border border-[#25D366]/40 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
        {suggestions.map(address => <li key={address.label + address.coordinates.join(',')} role="option" aria-selected={false}>
          <button type="button" onMouseDown={event => event.preventDefault()} onClick={() => choose(address)}
            className="w-full p-3 text-left text-xs text-white hover:bg-[#25D366]/15 focus:bg-[#25D366]/15">
            {address.label}
          </button>
        </li>)}
      </ul>}
    </div>
    <p className="text-[11px] text-gray-400">Sélectionnez votre adresse dans les suggestions. Départ : centre-ville d’Orange. 10 km offerts, puis 0,65 €/km supplémentaire sur le trajet routier aller le plus court.</p>
    <div aria-live="polite" className="text-xs">
      {busy && <p className="text-gray-300 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />{selected ? 'Calcul du trajet routier…' : 'Recherche des adresses…'}</p>}
      {message && <p className="text-amber-300">{message}</p>}
      {selected && !travel && !busy && <button type="button" onClick={() => choose(selected)} className="mt-2 text-[#25D366] underline">Réessayer le calcul</button>}
      {travel && <div className="p-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-white flex items-start gap-2">
        <MapPin className="w-4 h-4 text-[#25D366] shrink-0" />
        <div><p>{travel.distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} km par la route depuis le centre-ville d’Orange</p>
          <p className="font-bold text-[#25D366] mt-1">{travel.fee === 0 ? 'Déplacement offert' : 'Frais de déplacement : +' + travel.fee.toFixed(2).replace('.', ',') + ' €'}</p>
        </div>
      </div>}
    </div>
  </div>;
}
