import React, { useRef } from 'react';
import { AppState, PRESET_THEMES, SlideData, ThemeConfig } from '../types';
import { Icons } from './ui/Icons';

interface EditorSidebarProps {
  activeSlide: SlideData;
  appState: AppState;
  onUpdateSlide: (updates: Partial<SlideData>) => void;
  onUpdateTheme: (updates: Partial<ThemeConfig>) => void;
  onUpdateLogo: (logo: string | null) => void;
  onUpdateCSS: (css: string) => void;
}

type Tab = 'content' | 'design' | 'css';

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  activeSlide,
  appState,
  onUpdateSlide,
  onUpdateTheme,
  onUpdateLogo,
  onUpdateCSS
}) => {
  const [activeTab, setActiveTab] = React.useState<Tab>('content');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const slideImageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          callback(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sidebar">
      
      {/* Tabs Header */}
      <div className="sidebar-tabs">
        <button
          onClick={() => setActiveTab('content')}
          className={`sidebar-tab-btn ${activeTab === 'content' ? 'active' : ''}`}
        >
          <Icons.Layers size={16} />
          <span>المحتوى</span>
        </button>
        <button
          onClick={() => setActiveTab('design')}
          className={`sidebar-tab-btn ${activeTab === 'design' ? 'active' : ''}`}
        >
          <Icons.Palette size={16} />
          <span>التصميم</span>
        </button>
        <button
          onClick={() => setActiveTab('css')}
          className={`sidebar-tab-btn ${activeTab === 'css' ? 'active' : ''}`}
        >
          <Icons.Code size={16} />
          <span>CSS</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="sidebar-scroll-area">
        
        {/* TAB: CONTENT */}
        {activeTab === 'content' && (
          <div className="animate-fadeIn">
            <div className="form-group">
              <label className="form-label">العنوان الرئيسي</label>
              <input
                type="text"
                value={activeSlide.title}
                onChange={(e) => onUpdateSlide({ title: e.target.value })}
                className="form-input"
                dir="rtl"
              />
            </div>
            <div className="form-group">
              <label className="form-label">العنوان الفرعي</label>
              <input
                type="text"
                value={activeSlide.subtitle}
                onChange={(e) => onUpdateSlide({ subtitle: e.target.value })}
                className="form-input"
                dir="rtl"
              />
            </div>
            <div className="form-group">
              <label className="form-label">الوصف</label>
              <textarea
                rows={4}
                value={activeSlide.description}
                onChange={(e) => onUpdateSlide({ description: e.target.value })}
                className="form-textarea"
                dir="rtl"
              />
            </div>
            <div className="form-group">
              <label className="form-label">نص الزر (CTA)</label>
              <input
                type="text"
                value={activeSlide.ctaText}
                onChange={(e) => onUpdateSlide({ ctaText: e.target.value })}
                className="form-input"
                dir="rtl"
              />
            </div>
            <div className="form-group">
              <label className="form-label">شارة تمييز (اختياري)</label>
              <input
                type="text"
                value={activeSlide.highlight || ''}
                onChange={(e) => onUpdateSlide({ highlight: e.target.value })}
                placeholder="مثال: الأكثر مبيعاً"
                className="form-input"
                dir="rtl"
              />
            </div>
            
            <div className="sidebar-section-divider" />
            
            <div className="sidebar-section">
              <label className="form-label">صورة الكارت</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                 <button 
                  onClick={() => slideImageInputRef.current?.click()}
                  style={{ 
                    flex: 1, 
                    backgroundColor: 'var(--bg-input)', 
                    border: '1px dashed #333', 
                    borderRadius: '0.25rem', 
                    height: '5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <Icons.Image size={20} style={{ marginBottom: '0.25rem' }} />
                  <span style={{ fontSize: '0.75rem' }}>تغيير الصورة</span>
                </button>
                <input
                  type="file"
                  ref={slideImageInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, (url) => onUpdateSlide({ image: url }))}
                />
                 {activeSlide.image && (
                   <div style={{ 
                     width: '5rem', 
                     height: '5rem', 
                     borderRadius: '0.25rem', 
                     backgroundSize: 'cover', 
                     backgroundPosition: 'center', 
                     border: '1px solid #333',
                     backgroundImage: `url(${activeSlide.image})`
                   }} />
                 )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: DESIGN */}
        {activeTab === 'design' && (
          <div className="animate-fadeIn">
            
            {/* Theme Presets */}
            <div className="sidebar-section">
              <label className="form-label" style={{ marginBottom: '0.75rem' }}>ثيمات احترافية جاهزة</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {PRESET_THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => onUpdateTheme(theme.colors)}
                    style={{ 
                      padding: '0.375rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #333', 
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'right'
                    }}
                  >
                    <div style={{ width: '100%', height: '3rem', borderRadius: '0.25rem', border: '1px solid #333', display: 'flex', overflow: 'hidden' }}>
                      <div style={{ width: '50%', height: '100%', backgroundColor: theme.colors.backgroundColor }} />
                      <div style={{ width: '50%', height: '100%', backgroundColor: theme.colors.primaryColor }} />
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', padding: '0 0.25rem' }}>
                      {theme.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-section-divider" />

            <div className="sidebar-section">
              <label className="form-label">اختر شعار المنصة</label>
              <div className="logo-grid">
                {['logo-1.png', 'logo-2.png', 'logo-3.png', 'logo-4.png'].map((logoName) => (
                  <button
                    key={logoName}
                    onClick={() => onUpdateLogo(`/logooo/${logoName}`)}
                    className={`logo-item-btn ${appState.logo === `/logooo/${logoName}` ? 'active' : ''}`}
                    title={logoName}
                  >
                    <img src={`/logooo/${logoName}`} alt={logoName} className="logo-item-img" />
                  </button>
                ))}
              </div>
              
              <div className="sidebar-section-divider" style={{ margin: '1rem 0' }} />
              
              <label className="form-label">لوجو خارجي أو إزالة</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => logoInputRef.current?.click()}
                  className="form-input"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Icons.Upload size={14} />
                  <span>رفع لوجو مخصص</span>
                </button>
                
                {appState.logo && (
                  <button 
                    onClick={() => onUpdateLogo(null)}
                    className="btn-remove-logo"
                  >
                    <Icons.Trash2 size={14} />
                    <span>إزالة الشعار كلياً</span>
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={logoInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, onUpdateLogo)}
              />
              {appState.logo && (
                <div style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '0.25rem', border: '1px solid #333', display: 'flex', justifyContent: 'center' }}>
                  <img src={appState.logo} alt="Logo Preview" style={{ height: '2rem', objectFit: 'contain' }} />
                </div>
              )}
            </div>

            <div className="sidebar-section" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <label className="form-label">تخصيص الألوان يدوياً</label>
               
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: '0.875rem', color: '#ccc' }}>لون أساسي</span>
                 <input 
                    type="color" 
                    value={appState.theme.primaryColor}
                    onChange={(e) => onUpdateTheme({ primaryColor: e.target.value })}
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                 />
               </div>

               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: '0.875rem', color: '#ccc' }}>لون الخلفية</span>
                 <input 
                    type="color" 
                    value={appState.theme.backgroundColor}
                    onChange={(e) => onUpdateTheme({ backgroundColor: e.target.value })}
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                 />
               </div>

               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: '0.875rem', color: '#ccc' }}>لون الكارت</span>
                 <input 
                    type="color" 
                    value={appState.theme.cardBackground === 'rgba(255, 255, 255, 0.05)' ? '#333333' : appState.theme.cardBackground}
                    onChange={(e) => onUpdateTheme({ cardBackground: e.target.value })}
                    style={{ width: '2rem', height: '2rem', borderRadius: '0.25rem', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
                 />
               </div>
            </div>
            
            <div style={{ padding: '0.75rem', backgroundColor: 'rgba(120, 90, 0, 0.1)', border: '1px solid rgba(120, 90, 0, 0.2)', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#b7791f', lineHeight: 1.5 }}>
              يمكنك تخصيص الألوان لتعكس هوية علامتك التجارية. الصور المرفوعة سيتم تحسينها تلقائياً للعرض.
            </div>
          </div>
        )}

        {/* TAB: CSS */}
        {activeTab === 'css' && (
          <div className="animate-fadeIn" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#60a5fa' }}>
              <Icons.Code size={14} />
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>محرر CSS المتقدم</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#666' }}>
              اكتب كود CSS مخصص سيتم تطبيقه على الشريحة. استخدم `!important` إذا لزم الأمر لتجاوز الأنماط الافتراضية.
              الكلاس الرئيسي هو `.custom-slide-wrapper`.
            </p>
            <textarea
              value={appState.customCSS}
              onChange={(e) => onUpdateCSS(e.target.value)}
              className="form-textarea"
              style={{ flex: 1, backgroundColor: '#0d0d0d', color: '#4ade80', fontFamily: 'monospace', fontSize: '0.75rem' }}
              placeholder=".custom-slide-wrapper h1 { color: red; }"
              spellCheck={false}
            />
          </div>
        )}

      </div>
    </div>
  );
};