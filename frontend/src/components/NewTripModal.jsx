import { useState } from 'react';
import { Modal, Input, Button } from './ui';
import { apiPost } from '../services/api';
import { useToast } from './ui/Toast';

export default function NewTripModal({ isOpen, onClose, onTripCreated }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    duration: '',
    budget: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newTripData = {
        destination: formData.destination,
        date: formData.date,
        duration: formData.duration,
        budget: formData.budget,
        eco_score: Math.floor(Math.random() * (100 - 80) + 80), // Mock eco score 80-100
        status: 'planning',
        tags: ['Exploration'],
        activities: ['Sightseeing'],
        image: '🌍',
      };

      const createdTrip = await apiPost('/trips', newTripData);
      toast.success('Trip created successfully!');
      onTripCreated(createdTrip);
      setFormData({ destination: '', date: '', duration: '', budget: '' });
      onClose();
    } catch (err) {
      toast.error(err.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan a New Trip" size="md">
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <Input
          id="destination"
          label="Destination"
          placeholder="e.g., Kyoto, Japan"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="date"
            label="Date"
            placeholder="e.g., Oct 2026"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            id="duration"
            label="Duration"
            placeholder="e.g., 7 days"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          id="budget"
          label="Budget"
          placeholder="e.g., $1,500"
          value={formData.budget}
          onChange={handleChange}
          required
        />
        
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
          <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={loading}>
            Create Trip
          </Button>
        </div>
      </form>
    </Modal>
  );
}
