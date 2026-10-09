import React, { useState } from 'react';
import { MapPin, Plus, Check, Home, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { validateName, validatePhone, validateZipCode } from '../../utils/validators';

export const AddressStep = ({ selectedAddress, onSelectAddress, onNext }) => {
  const { user, addAddress } = useAuth();
  const [showNewAddressForm, setShowNewAddressForm] = useState(
    !user?.addresses || user.addresses.length === 0
  );

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Riddhi Gupta',
    phone: user?.phone || '+1 (555) 345-6789',
    street: '',
    city: '',
    state: 'CA',
    zipCode: '',
    country: 'United States',
    label: 'Home',
    isDefault: true,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    const newErrors = {};

    const nameErr = validateName(formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';

    const zipErr = validateZipCode(formData.zipCode);
    if (zipErr) newErrors.zipCode = zipErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addAddress(formData);
    onSelectAddress(formData);
    setShowNewAddressForm(false);
  };

  const handleContinue = () => {
    if (!selectedAddress) {
      if (user?.addresses && user.addresses.length > 0) {
        onSelectAddress(user.addresses[0]);
      }
    }
    onNext();
  };

  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-500" />
          <span>Shipping Address</span>
        </h3>

        {user?.addresses && user.addresses.length > 0 && (
          <button
            type="button"
            onClick={() => setShowNewAddressForm(!showNewAddressForm)}
            className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showNewAddressForm ? 'Select Saved Address' : 'Add New Address'}</span>
          </button>
        )}
      </div>

      {/* Saved Addresses Selector */}
      {!showNewAddressForm && user?.addresses && user.addresses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.addresses.map((addr) => {
            const isSelected = selectedAddress?.id === addr.id || (!selectedAddress && addr.isDefault);
            return (
              <div
                key={addr.id}
                onClick={() => onSelectAddress(addr)}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-brand-950/40 shadow-glow-red'
                    : 'border-slate-800 hover:border-slate-700 bg-dark-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    {addr.label === 'Work' ? <Briefcase className="w-3.5 h-3.5 text-slate-400" /> : <Home className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{addr.fullName}</span>
                    <span className="text-[10px] bg-dark-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded font-normal">
                      {addr.label}
                    </span>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-brand-500 bg-brand-600 text-white' : 'border-slate-700 bg-dark-800'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-400 space-y-0.5">
                  <p className="text-slate-300">{addr.street}</p>
                  <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="text-slate-500">{addr.country}</p>
                  <p className="pt-1 font-semibold text-emerald-400">{addr.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add New Address Form */}
      {showNewAddressForm && (
        <form onSubmit={handleSaveNewAddress} className="space-y-4 bg-dark-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.fullName ? 'border-brand-500 focus:ring-brand-500/30' : 'border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
                placeholder="e.g. Riddhi Gupta"
              />
              {errors.fullName && <p className="text-[11px] text-brand-400 mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.phone ? 'border-brand-500 focus:ring-brand-500/30' : 'border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-[11px] text-brand-400 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                errors.street ? 'border-brand-500 focus:ring-brand-500/30' : 'border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
              }`}
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
            {errors.street && <p className="text-[11px] text-brand-400 mt-1">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">City *</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.city ? 'border-brand-500 focus:ring-brand-500/30' : 'border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
                placeholder="City"
              />
              {errors.city && <p className="text-[11px] text-brand-400 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                placeholder="State"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-bold text-slate-300 mb-1">Pin / Zip Code *</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-dark-950 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 ${
                  errors.zipCode ? 'border-brand-500 focus:ring-brand-500/30' : 'border-slate-700 focus:ring-brand-500/20 focus:border-brand-500'
                }`}
                placeholder="110001"
              />
              {errors.zipCode && <p className="text-[11px] text-brand-400 mt-1">{errors.zipCode}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
            >
              Save Address
            </Button>
          </div>
        </form>
      )}

      {/* Next button */}
      <div className="pt-2 flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleContinue}
          className="shadow-glow-red"
        >
          Continue to Delivery Options
        </Button>
      </div>

    </div>
  );
};
