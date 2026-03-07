import React from 'react';
import { SlideData } from '../types';
import { Icons } from './ui/Icons';

interface CarouselNavProps {
  slides: SlideData[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onDelete: (index: number) => void;
}

export const CarouselNav: React.FC<CarouselNavProps> = ({
  slides,
  activeIndex,
  onSelect,
  onAdd,
  onDelete
}) => {
  return (
    <div className="carousel-nav">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          onClick={() => onSelect(index)}
          className={`slide-thumb ${index === activeIndex ? 'active' : ''}`}
        >
          {/* Mini Preview */}
          <div style={{ padding: '0.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', opacity: 0.7 }}>
            <span style={{ fontSize: '10px', color: '#666', marginBottom: '0.25rem' }}>{index + 1}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', padding: '0 0.5rem' }}>{slide.title}</span>
          </div>

          {/* Delete Button (visible on hover, only if more than 1 slide) */}
          {slides.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
              style={{
                position: 'absolute',
                top: '0.25rem',
                right: '0.25rem',
                padding: '0.25rem',
                backgroundColor: 'rgba(239, 68, 68, 0.8)',
                borderRadius: '0.25rem',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Icons.Trash2 size={12} />
            </button>
          )}
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={onAdd}
        style={{
          flexShrink: 0,
          width: '6rem',
          height: '4rem',
          borderRadius: '0.375rem',
          border: '2px dashed #333',
          backgroundColor: 'rgba(26, 26, 26, 0.5)',
          color: '#666',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
      >
        <Icons.Plus size={24} />
        <span style={{ fontSize: '0.75rem' }}>إضافة</span>
      </button>
    </div>
  );
};