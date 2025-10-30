# 🏢 Hiring Partners Carousel

## ✅ **Real Company Data Integration**

I've created a dynamic, auto-scrolling carousel showcasing all 25+ real hiring partners with professional styling and smooth animations.

## 🎯 **Features Implemented**

### **1. Real Company Data**
- **25 Companies**: All real hiring partners from your list
- **Organized Data**: Structured in `src/data/companies.ts`
- **Future Ready**: Easy to add logos and websites later

### **2. Auto-Scrolling Carousel**
- **Two Rows**: Companies split into two horizontal rows
- **Opposite Directions**: Top row scrolls left-to-right, bottom row right-to-left
- **Seamless Loop**: Infinite scrolling with duplicated content
- **Smooth Animation**: 30-second cycle with CSS animations

### **3. Interactive Design**
- **Hover Effects**: Cards lift and pause animation on hover
- **Professional Styling**: Clean white cards with subtle shadows
- **Icon Integration**: Briefcase and Award icons for visual appeal
- **Responsive**: Works perfectly on all devices

## 🏢 **Company List Included**

### **Row 1 (Left to Right)**
- Zoho Corporation
- Freshworks
- Chargebee
- Kissflow
- Indium Software
- Aspire Systems
- TVS Next
- Kaar Technologies
- Ramco Systems
- Intellect Design Arena
- Saksoft
- Ideas2IT
- DataPatterns

### **Row 2 (Right to Left)**
- Contus
- Bahwan Cybertek
- Prodapt Solutions
- Agilisium Consulting
- DCKAP
- HTC Global Services
- Infoview Technologies
- Visteon (IT Chennai)
- Payoda Technologies
- GoFrugal Technologies
- CavinKare
- WayCool Foods

## 🎨 **Visual Design**

### **Card Styling**
- **Clean White Cards**: Professional appearance
- **Subtle Shadows**: Depth without distraction
- **Icon Badges**: Primary color icons for branding
- **Hover Effects**: Interactive feedback
- **Consistent Sizing**: 220px width, 96px height

### **Animation Details**
- **Speed**: 30 seconds per complete cycle
- **Direction**: Alternating rows for visual interest
- **Pause on Hover**: User can stop to read company names
- **Smooth Transitions**: CSS-based animations for performance

## 🔧 **Technical Implementation**

### **CSS Animations**
```css
@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

@keyframes scroll-reverse {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
```

### **React Component**
- **Data-Driven**: Uses company data from external file
- **Dynamic Rendering**: Maps through company arrays
- **Duplicate Content**: Seamless infinite scroll
- **Responsive Grid**: Adapts to screen sizes

## 📱 **Responsive Behavior**

- **Desktop**: Full two-row carousel with all companies visible
- **Tablet**: Maintains carousel with adjusted spacing
- **Mobile**: Single-row view with touch-friendly cards

## 🚀 **Future Enhancements**

### **Ready for Logos**
- Company logo paths already defined in data
- Easy to replace icons with actual company logos
- Fallback to company names if logos unavailable

### **Interactive Features**
- Click to visit company websites
- Tooltip with company information
- Filter by industry or location

## 📊 **Updated Statistics**

- **Companies Partnered**: Updated to "25+" 
- **Top Companies**: Comprehensive list in placement stats
- **Real Data**: All companies from your actual hiring partners

## 🎯 **Benefits**

1. **Professional Appearance**: Showcases credibility with real partners
2. **Dynamic Content**: Eye-catching moving carousel
3. **User Engagement**: Interactive hover effects
4. **Brand Trust**: Displays association with known companies
5. **Easy Maintenance**: Structured data for easy updates

Your hiring partners are now beautifully displayed in a professional, auto-scrolling carousel that showcases all 25+ real companies! 🎉