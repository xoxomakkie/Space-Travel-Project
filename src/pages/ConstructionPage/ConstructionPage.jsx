import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSpaceTravel } from '../../context/SpaceTravelContext.jsx';
import styles from './ConstructionPage.module.css';

const ConstructionPage = () => {
  const navigate = useNavigate();
  const { buildSpacecraft, error } = useSpaceTravel();
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    description: '',
    pictureUrl: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Spacecraft name is required';
    }
    
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      errors.capacity = 'Capacity must be a positive number';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const spacecraftData = {
      name: formData.name.trim(),
      capacity: parseInt(formData.capacity),
      description: formData.description.trim(),
      pictureUrl: formData.pictureUrl.trim() || undefined
    };

    const success = await buildSpacecraft(spacecraftData);
    
    if (success) {
      navigate('/spacecrafts');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className={styles.construction}>
      <div className={styles.construction__header}>
        <Link to="/spacecrafts" className={styles.construction__backButton}>
          ← Back to Spacecrafts
        </Link>
      </div>

      <div className={styles.construction__content}>
        <h1 className={styles.construction__title}>Spacecraft Construction Bay</h1>
        <p className={styles.construction__subtitle}>
          Design and build a new spacecraft for evacuation operations
        </p>

        <form onSubmit={handleSubmit} className={styles.construction__form}>
          <div className={styles.construction__field}>
            <label htmlFor="name" className={styles.construction__label}>
              Spacecraft Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${styles.construction__input} ${
                formErrors.name ? styles['construction__input--error'] : ''
              }`}
              placeholder="Enter spacecraft name"
            />
            {formErrors.name && (
              <span className={styles.construction__error}>{formErrors.name}</span>
            )}
          </div>

          <div className={styles.construction__field}>
            <label htmlFor="capacity" className={styles.construction__label}>
              Passenger Capacity *
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className={`${styles.construction__input} ${
                formErrors.capacity ? styles['construction__input--error'] : ''
              }`}
              placeholder="Enter passenger capacity"
              min="1"
            />
            {formErrors.capacity && (
              <span className={styles.construction__error}>{formErrors.capacity}</span>
            )}
          </div>

          <div className={styles.construction__field}>
            <label htmlFor="description" className={styles.construction__label}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`${styles.construction__textarea} ${
                formErrors.description ? styles['construction__textarea--error'] : ''
              }`}
              placeholder="Enter spacecraft description"
              rows="6"
            ></textarea>
            {formErrors.description && (
              <span className={styles.construction__error}>{formErrors.description}</span>
            )}
          </div>

          <div className={styles.construction__field}>
            <label htmlFor="pictureUrl" className={styles.construction__label}>
              Picture URL (Optional)
            </label>
            <input
              type="url"
              id="pictureUrl"
              name="pictureUrl"
              value={formData.pictureUrl}
              onChange={handleChange}
              className={styles.construction__input}
              placeholder="Enter image URL"
            />
          </div>

          {error && (
            <div className={styles.construction__error}>
              {error}
            </div>
          )}

          <div className={styles.construction__actions}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.construction__button}
            >
              {isSubmitting ? 'Building Spacecraft...' : 'Build Spacecraft'}
            </button>
            <Link to="/spacecrafts" className={styles.construction__cancelButton}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConstructionPage;
