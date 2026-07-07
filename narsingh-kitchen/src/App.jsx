import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, MessageCircle, MapPin, Clock, 
  ChefHat, Leaf, Package, Star, ArrowRight, 
  Instagram, Facebook, Mail, ShieldCheck, Utensils
} from 'lucide-react';

const CONTACT_PHONE = "+917000625689";
const DISPLAY_PHONE = "+91 70006 25689";
const WHATSAPP_LINK = `https://wa.me/917000625689?text=Hello%20Narsingh%20Kitchen,%20I%20would%20like%20to%20place%20an%20order.`;
const ADDRESS = "Ashoka Garden Thana, Bhopal, Madhya Pradesh";

const COLORS = {
  primary: '#6B111A', // Deep Maroon/Dark Red
  bg: '#FDFBF7',      // Warm Off-white
  text: '#1C1C1C',    // Charcoal
  textMuted: '#595959',
  border: '#EAE6DF'
};

const Button = ({ children, variant = 'primary', className = '', href, onClick, icon: Icon }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all duration-300 ease-out";
  const variants = {
    primary: "bg-[#6B111A] text-white hover:bg-[#4A0A10] border border-[#6B111A]",
    outline: "bg-transparent text-[#6B111A] border border-[#6B111A] hover:bg-[#6B111A] hover:text-white",
    ghost: "bg-transparent text-[#1C1C1C] hover:text-[#6B111A]"
  };

  const combinedClasses = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} target={href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer">
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    {subtitle && <p className="text-[#6B111A] text-sm uppercase tracking-widest font-semibold mb-3">{subtitle}</p>}
    <h2 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] leading-tight">{title}</h2>
    <div className={`h-1 w-16 bg-[#6B111A] mt-6 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const ImagePlaceholder = ({ category, className = "" }) => {
  const images = {
    hero: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop",
    fastfood: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    tiffin: "https://images.unsplash.com/photo-1628296582103-6bf2db336049?q=80&w=1000&auto=format&fit=crop", // Using Indian food/thali imagery
    spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop",
    kitchen: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000&auto=format&fit=crop"
  };

  return (
    <div className={`relative overflow-hidden bg-[#EAE6DF] ${className}`}>
      <img 
        src={images[category] || images.hero} 
        alt={`Narsingh Kitchen ${category}`} 
        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
};

const Header = ({ currentPage, navigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Fast Food', id: 'fastfood' },
    { name: 'Tiffin Service', id: 'tiffin' },
    { name: 'Spices Store', id: 'spices' },
    { name: 'About Us', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNav = (id) => {
    navigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm py-4' : 'bg-white/90 backdrop-blur-md py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#6B111A] flex items-center justify-center rounded-sm">
            <Utensils className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl font-bold text-[#1C1C1C] leading-none tracking-wide group-hover:text-[#6B111A] transition-colors">NARSINGH</span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#595959] mt-1 font-medium">Kitchen</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-sm font-medium tracking-wide transition-colors ${currentPage === link.id ? 'text-[#6B111A]' : 'text-[#595959] hover:text-[#1C1C1C]'}`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button variant="outline" href={`tel:${CONTACT_PHONE}`} icon={Phone} className="py-2.5 px-6">
            Call Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-[#1C1C1C]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-[#EAE6DF] shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`text-left py-2 text-lg font-serif border-b border-[#EAE6DF] last:border-0 ${currentPage === link.id ? 'text-[#6B111A]' : 'text-[#1C1C1C]'}`}
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" href={WHATSAPP_LINK} icon={MessageCircle} className="w-full mt-4">
            WhatsApp Us
          </Button>
        </div>
      )}
    </header>
  );
};

const Footer = ({ navigate }) => (
  <footer className="bg-[#111111] text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6 opacity-90">
             <div className="w-10 h-10 bg-[#6B111A] flex items-center justify-center rounded-sm">
                <Utensils className="text-white w-5 h-5" />
              </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-xl font-bold text-white leading-none tracking-wide">NARSINGH</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-1 font-medium">Kitchen</span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            A premium culinary experience in Bhopal bringing together quality fast food, homestyle tiffin subscriptions, and authentic Indian spices under one identity.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#6B111A] hover:border-[#6B111A] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#6B111A] hover:border-[#6B111A] transition-colors"><Facebook className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Our Services</h4>
          <ul className="space-y-4">
            <li><button onClick={() => {navigate('fastfood'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Premium Fast Food</button></li>
            <li><button onClick={() => {navigate('tiffin'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Daily Tiffin Subscription</button></li>
            <li><button onClick={() => {navigate('spices'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Authentic Masale</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Quick Links</h4>
          <ul className="space-y-4">
            <li><button onClick={() => {navigate('about'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Our Story</button></li>
            <li><button onClick={() => {navigate('contact'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Contact & Location</button></li>
            <li><button onClick={() => {navigate('privacy'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</button></li>
            <li><button onClick={() => {navigate('terms'); window.scrollTo(0,0);}} className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-gray-400 text-sm">
              <MapPin className="w-5 h-5 text-[#6B111A] shrink-0" />
              <span>{ADDRESS}</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Phone className="w-5 h-5 text-[#6B111A]" />
              <a href={`tel:${CONTACT_PHONE}`} className="hover:text-white transition-colors">{DISPLAY_PHONE}</a>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail className="w-5 h-5 text-[#6B111A]" />
              <a href="mailto:info@narsinghkitchen.com" className="hover:text-white transition-colors">info@narsinghkitchen.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">© {new Date().getFullYear()} Narsingh Kitchen. All rights reserved.</p>
        <p className="text-gray-500 text-xs">Bhopal, Madhya Pradesh</p>
      </div>
    </div>
  </footer>
);

const FloatingContact = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
    <a 
      href={`tel:${CONTACT_PHONE}`}
      className="w-14 h-14 bg-[#1C1C1C] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform"
      aria-label="Call Us"
    >
      <Phone className="w-6 h-6" />
    </a>
    <a 
      href={WHATSAPP_LINK}
      className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:-translate-y-1 transition-transform"
      aria-label="WhatsApp Us"
      target="_blank" rel="noreferrer"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  </div>
);

const HomePage = ({ navigate }) => (
  <div className="w-full">
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center bg-[#FDFBF7] pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block bg-[#EAE6DF]">
         <ImagePlaceholder category="hero" className="w-full h-full" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 grid lg:grid-cols-2 gap-12">
        <div className="max-w-xl py-20">
          <span className="text-[#6B111A] tracking-widest uppercase text-sm font-semibold mb-6 block">Welcome to Narsingh Kitchen</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1C1C1C] leading-[1.1] mb-8">
            Taste Rooted in <span className="italic text-[#6B111A]">Tradition</span>.
          </h1>
          <p className="text-lg text-[#595959] mb-10 leading-relaxed">
            Experience Bhopal's finest culinary destination. From premium fast food and homestyle tiffin subscriptions to authentic, pure spices sourced with care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" onClick={() => navigate('fastfood')}>Explore Menu</Button>
            <Button variant="outline" href={WHATSAPP_LINK} icon={MessageCircle}>Order via WhatsApp</Button>
          </div>
        </div>
      </div>
    </section>

    {/* Services Overview */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading title="Three Pillars of Flavor" subtitle="Our Offerings" centered />
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {/* Service 1 */}
          <div className="group cursor-pointer" onClick={() => navigate('fastfood')}>
            <div className="h-80 mb-6 overflow-hidden bg-[#FDFBF7]">
              <ImagePlaceholder category="fastfood" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-3 group-hover:text-[#6B111A] transition-colors">Premium Fast Food</h3>
            <p className="text-[#595959] leading-relaxed mb-4">Elevated quick service favorites prepared with exceptional ingredients and uncompromised hygiene.</p>
            <div className="flex items-center text-[#6B111A] font-medium text-sm tracking-wide">
              DISCOVER MENU <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Service 2 */}
          <div className="group cursor-pointer" onClick={() => navigate('tiffin')}>
            <div className="h-80 mb-6 overflow-hidden bg-[#FDFBF7]">
              <ImagePlaceholder category="tiffin" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-3 group-hover:text-[#6B111A] transition-colors">Tiffin Subscription</h3>
            <p className="text-[#595959] leading-relaxed mb-4">Daily homestyle meals delivered to your doorstep. Nutrition, taste, and punctuality guaranteed.</p>
            <div className="flex items-center text-[#6B111A] font-medium text-sm tracking-wide">
              VIEW PLANS <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* Service 3 */}
          <div className="group cursor-pointer" onClick={() => navigate('spices')}>
            <div className="h-80 mb-6 overflow-hidden bg-[#FDFBF7]">
               <ImagePlaceholder category="spices" className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-3 group-hover:text-[#6B111A] transition-colors">Authentic Masale</h3>
            <p className="text-[#595959] leading-relaxed mb-4">Pure, unadulterated Indian spices to bring the essence of traditional cooking into your own kitchen.</p>
            <div className="flex items-center text-[#6B111A] font-medium text-sm tracking-wide">
              SHOP SPICES <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Brand Values */}
    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading title="The Narsingh Standard" subtitle="Why Choose Us" />
            <p className="text-[#595959] text-lg leading-relaxed mb-8">
              Based in Ashoka Garden, Bhopal, we built Narsingh Kitchen to bridge the gap between convenience and uncompromising quality. Whether you are ordering a quick bite, subscribing to daily meals, or stocking your pantry.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6B111A]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#6B111A]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1C1C1C] mb-2">Purity & Hygiene</h4>
                  <p className="text-[#595959]">Strict sanitation standards across our kitchen and packaging processes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6B111A]/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#6B111A]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1C1C1C] mb-2">Reliable Punctuality</h4>
                  <p className="text-[#595959]">Your tiffins and orders arrive exactly when you expect them.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-[#6B111A]/10 flex items-center justify-center shrink-0">
                  <ChefHat className="w-6 h-6 text-[#6B111A]" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-[#1C1C1C] mb-2">Authentic Recipes</h4>
                  <p className="text-[#595959]">Honoring traditional flavors without shortcuts or artificial enhancers.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[600px]">
            <ImagePlaceholder category="kitchen" className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 bg-[#111111] text-center px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Ready to Experience the Best?</h2>
        <p className="text-gray-400 text-lg mb-10">Contact us directly via WhatsApp or Phone to place an order or inquire about our services in Bhopal.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="primary" href={WHATSAPP_LINK} icon={MessageCircle} className="bg-[#25D366] hover:bg-[#1EBE5D] border-none text-white">
            Message on WhatsApp
          </Button>
          <Button variant="outline" href={`tel:${CONTACT_PHONE}`} icon={Phone} className="text-white border-gray-600 hover:bg-white hover:text-black">
            Call {DISPLAY_PHONE}
          </Button>
        </div>
      </div>
    </section>
  </div>
);

const FastFoodPage = () => (
  <div className="w-full pt-20">
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <SectionHeading title="Premium Fast Food" subtitle="Quick Bites, Elevated" centered />
        <p className="max-w-2xl mx-auto text-[#595959] text-lg mt-6">
          Indulge in our carefully crafted menu of rolls, burgers, and classic fast food. Prepared fresh using high-quality ingredients, because fast food shouldn't mean a compromise on taste or health.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <ImagePlaceholder category="fastfood" className="h-[500px]" />
          <div className="flex flex-col justify-center">
            <h3 className="text-3xl font-serif text-[#1C1C1C] mb-6">Signature Rolls & Wraps</h3>
            <p className="text-[#595959] mb-8 leading-relaxed">
              Our rolls are a local favorite in Ashoka Garden. Wrapped in freshly made parathas and filled with generous, perfectly spiced ingredients.
            </p>
            <ul className="space-y-4 mb-8 border-t border-b border-[#EAE6DF] py-6">
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Classic Paneer Tikka Roll</span> <span className="text-[#6B111A]">₹---</span></li>
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Spicy Soya Chaap Roll</span> <span className="text-[#6B111A]">₹---</span></li>
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Double Cheese Veg Roll</span> <span className="text-[#6B111A]">₹---</span></li>
            </ul>
            <div className="text-sm text-[#595959] italic">* Prices and full menu available upon inquiry.</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 md:flex-row-reverse mb-20">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-3xl font-serif text-[#1C1C1C] mb-6">Gourmet Burgers & Sandwiches</h3>
            <p className="text-[#595959] mb-8 leading-relaxed">
              Soft buns, crisp vegetables, and handcrafted patties with our signature house-made sauces. A satisfying bite every single time.
            </p>
             <ul className="space-y-4 mb-8 border-t border-b border-[#EAE6DF] py-6">
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Narsingh Special Burger</span> <span className="text-[#6B111A]">₹---</span></li>
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Crispy Aloo Tikki Supreme</span> <span className="text-[#6B111A]">₹---</span></li>
              <li className="flex justify-between items-center text-[#1C1C1C]"><span className="font-medium">Grilled Bombay Sandwich</span> <span className="text-[#6B111A]">₹---</span></li>
            </ul>
          </div>
          <ImagePlaceholder category="fastfood" className="h-[500px] order-1 md:order-2" />
        </div>
      </div>
    </section>

    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-serif text-[#1C1C1C] mb-6">How to Order</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
          <div className="bg-white p-8 border border-[#EAE6DF] flex-1">
            <span className="text-[#6B111A] font-serif text-5xl mb-4 block">1</span>
            <h4 className="text-lg font-semibold text-[#1C1C1C] mb-2">Browse & Decide</h4>
            <p className="text-[#595959] text-sm">Review our offerings above or ask for our full menu via chat.</p>
          </div>
          <div className="bg-white p-8 border border-[#EAE6DF] flex-1">
             <span className="text-[#6B111A] font-serif text-5xl mb-4 block">2</span>
            <h4 className="text-lg font-semibold text-[#1C1C1C] mb-2">Message or Call</h4>
            <p className="text-[#595959] text-sm">Reach out via WhatsApp or call us directly with your location.</p>
          </div>
          <div className="bg-white p-8 border border-[#EAE6DF] flex-1">
             <span className="text-[#6B111A] font-serif text-5xl mb-4 block">3</span>
            <h4 className="text-lg font-semibold text-[#1C1C1C] mb-2">Fresh Delivery</h4>
            <p className="text-[#595959] text-sm">We prepare your order fresh and deliver it hot to your doorstep.</p>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
           <Button variant="primary" href={WHATSAPP_LINK} icon={MessageCircle}>Place Order Now</Button>
        </div>
      </div>
    </section>
  </div>
);

const TiffinPage = () => (
  <div className="w-full pt-20">
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <SectionHeading title="Daily Tiffin Service" subtitle="Homestyle Comfort" centered />
        <p className="max-w-2xl mx-auto text-[#595959] text-lg mt-6">
          Missing home-cooked food? Our daily tiffin subscription brings nutritious, hygienic, and authentic meals straight to your home or office in Bhopal.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="border border-[#EAE6DF] bg-white p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-2">Daily Trial</h3>
            <p className="text-[#595959] mb-6">Perfect for tasting our quality.</p>
            <div className="text-4xl font-serif text-[#6B111A] mb-8">₹---<span className="text-lg text-[#595959] font-sans">/day</span></div>
            <ul className="space-y-3 mb-8 text-[#1C1C1C]">
              <li className="flex items-center gap-2"><CheckIcon /> Fresh Roti & Rice</li>
              <li className="flex items-center gap-2"><CheckIcon /> Seasonal Sabzi</li>
              <li className="flex items-center gap-2"><CheckIcon /> Dal Tadka</li>
              <li className="flex items-center gap-2"><CheckIcon /> Salad & Pickle</li>
            </ul>
            <Button variant="outline" href={WHATSAPP_LINK} className="w-full">Inquire Now</Button>
          </div>

          {/* Plan 2 */}
          <div className="border-2 border-[#6B111A] bg-[#FDFBF7] p-8 relative transform md:-translate-y-4 shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#6B111A] text-white px-4 py-1 text-xs uppercase tracking-wider font-semibold">Most Popular</div>
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-2">Monthly Subscription</h3>
            <p className="text-[#595959] mb-6">Consistent, hassle-free daily meals.</p>
             <div className="text-4xl font-serif text-[#6B111A] mb-8">₹---<span className="text-lg text-[#595959] font-sans">/mo</span></div>
            <ul className="space-y-3 mb-8 text-[#1C1C1C]">
              <li className="flex items-center gap-2"><CheckIcon /> 30 Days of Meals</li>
              <li className="flex items-center gap-2"><CheckIcon /> Rotating Menu</li>
              <li className="flex items-center gap-2"><CheckIcon /> Premium Packaging</li>
              <li className="flex items-center gap-2"><CheckIcon /> Weekend Specials (Sweet/Snack)</li>
              <li className="flex items-center gap-2"><CheckIcon /> Pause Anytime</li>
            </ul>
            <Button variant="primary" href={WHATSAPP_LINK} className="w-full">Subscribe Now</Button>
          </div>

          {/* Plan 3 */}
          <div className="border border-[#EAE6DF] bg-white p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-2">Corporate Plan</h3>
            <p className="text-[#595959] mb-6">Bulk orders for offices & teams.</p>
            <div className="text-4xl font-serif text-[#6B111A] mb-8">Custom<span className="text-lg text-[#595959] font-sans">/Pricing</span></div>
            <ul className="space-y-3 mb-8 text-[#1C1C1C]">
              <li className="flex items-center gap-2"><CheckIcon /> Flexible Quantities</li>
              <li className="flex items-center gap-2"><CheckIcon /> Dedicated Delivery Slot</li>
              <li className="flex items-center gap-2"><CheckIcon /> Custom Menu Options</li>
              <li className="flex items-center gap-2"><CheckIcon /> Monthly Billing</li>
            </ul>
             <Button variant="outline" href={`tel:${CONTACT_PHONE}`} className="w-full">Call to Discuss</Button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 bg-[#1C1C1C] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <ImagePlaceholder category="tiffin" className="h-[600px] opacity-80" />
        </div>
        <div>
          <h2 className="text-4xl font-serif mb-8">What goes into our Tiffin?</h2>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-[#EAE6DF]">Uncompromising Quality</h4>
              <p className="text-gray-400">We use market-fresh vegetables, branded cooking oils, and our own signature spices. No artificial colors or preservatives are ever used.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2 text-[#EAE6DF]">Variety & Nutrition</h4>
              <p className="text-gray-400">Our menu rotates daily to ensure you receive a balanced diet. Expect a comforting mix of pulses, seasonal greens, and whole wheat breads.</p>
            </div>
             <div>
              <h4 className="text-xl font-semibold mb-2 text-[#EAE6DF]">Hygienic Packaging</h4>
              <p className="text-gray-400">Delivered in food-grade, spill-proof containers ensuring your meal arrives hot, fresh, and ready to eat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const CheckIcon = () => <ShieldCheck className="w-5 h-5 text-[#6B111A] shrink-0" />;

const SpicesPage = () => (
  <div className="w-full pt-20">
     <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <SectionHeading title="Authentic Masale" subtitle="The Soul of the Kitchen" centered />
        <p className="max-w-2xl mx-auto text-[#595959] text-lg mt-6">
          Elevate your own cooking with Narsingh Kitchen's premium line of spices. Sourced for purity, ground with care, and packed to preserve their natural oils and aroma.
        </p>
      </div>
    </section>

    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Premium Garam Masala", desc: "Aromatic blend of whole spices." },
            { name: "Kashmiri Lal Mirch", desc: "Vibrant color, mild heat." },
            { name: "Haldi Powder", desc: "Pure, high-curcumin turmeric." },
            { name: "Coriander Powder", desc: "Freshly ground Dhaniya." },
            { name: "Sabzi Masala", desc: "Everyday vegetable seasoning." },
            { name: "Chole Masala", desc: "Authentic Punjabi flavor." },
            { name: "Chaat Masala", desc: "Tangy street-style seasoning." },
            { name: "Meat Masala", desc: "Robust blend for non-veg curries." }
          ].map((spice, idx) => (
            <div key={idx} className="border border-[#EAE6DF] p-6 hover:border-[#6B111A] transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center mb-6 group-hover:bg-[#6B111A] transition-colors">
                <Leaf className="w-6 h-6 text-[#6B111A] group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-serif text-[#1C1C1C] mb-2">{spice.name}</h4>
              <p className="text-[#595959] text-sm mb-6">{spice.desc}</p>
              <a href={WHATSAPP_LINK} className="text-[#6B111A] font-medium text-sm tracking-wide flex items-center hover:underline">
                INQUIRE TO ORDER <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="h-[500px]">
            <ImagePlaceholder category="spices" className="w-full h-full" />
          </div>
          <div>
            <SectionHeading title="The Promise of Purity" />
            <p className="text-[#595959] text-lg leading-relaxed mb-6">
              In a market flooded with adulterated products, Narsingh Kitchen brings you spices you can trust. Our masale are the exact same blends we use in our own commercial kitchen to prepare our renowned tiffin and fast food.
            </p>
             <p className="text-[#595959] text-lg leading-relaxed mb-8">
              We operate on a direct-to-consumer model. Browse our selection, contact us with your requirements, and we will package and deliver the freshest batches directly to you in Bhopal.
            </p>
            <Button variant="primary" href={WHATSAPP_LINK} icon={MessageCircle}>
              Order via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="w-full pt-20">
     <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <SectionHeading title="Our Story" subtitle="About Narsingh Kitchen" centered />
        <p className="text-[#595959] text-xl leading-relaxed mt-10">
          Narsingh Kitchen was founded with a singular vision: to create a food brand in Bhopal that refuses to compromise. We noticed a gap in the market — it was hard to find a place that offered the quick satisfaction of fast food, the comforting reliability of daily tiffins, and the foundational purity of raw spices, all under one trustworthy name.
        </p>
      </div>
    </section>
    
    <section className="py-0">
      <ImagePlaceholder category="kitchen" className="w-full h-[60vh]" />
    </section>

    <section className="py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-serif text-[#1C1C1C] mb-6">Our Philosophy</h3>
          <p className="text-[#595959] leading-relaxed mb-6">
            We believe that good food is the foundation of a good life. Whether you are grabbing a quick roll on a busy afternoon, relying on us to feed your family daily, or using our masale to cook a Sunday feast, we honor the trust you place in us.
          </p>
          <p className="text-[#595959] leading-relaxed">
            Our kitchen operates with transparency, utilizing premium ingredients, rigorous hygiene protocols, and recipes that have been perfected over time to deliver consistent, exceptional taste.
          </p>
        </div>
        <div className="bg-white p-10 border border-[#EAE6DF]">
           <h3 className="text-2xl font-serif text-[#1C1C1C] mb-6">Operating Locally, Thinking Premium</h3>
           <ul className="space-y-6">
             <li className="flex gap-4">
                <Package className="w-6 h-6 text-[#6B111A] shrink-0" />
                <div>
                  <strong className="block text-[#1C1C1C] mb-1">Unified Quality</strong>
                  <span className="text-[#595959] text-sm">One kitchen standard across Fast Food, Tiffins, and Spices.</span>
                </div>
             </li>
             <li className="flex gap-4">
                <MapPin className="w-6 h-6 text-[#6B111A] shrink-0" />
                <div>
                  <strong className="block text-[#1C1C1C] mb-1">Rooted in Bhopal</strong>
                  <span className="text-[#595959] text-sm">Proudly serving Ashoka Garden and surrounding areas.</span>
                </div>
             </li>
           </ul>
        </div>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="w-full pt-20">
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading title="Get in Touch" subtitle="Contact Us" />
        
        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Contact Info */}
          <div>
            <p className="text-[#595959] text-lg mb-10">
              Ready to place an order or have a question about our tiffin subscriptions or spice varieties? Reach out to us directly. We do not use automated carts — you will speak to a real person from our team.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border border-[#EAE6DF] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#6B111A]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wider mb-1">Phone</h4>
                  <a href={`tel:${CONTACT_PHONE}`} className="text-xl font-serif text-[#6B111A] hover:underline">{DISPLAY_PHONE}</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wider mb-1">WhatsApp</h4>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="text-xl font-serif text-[#1C1C1C] hover:text-[#25D366] transition-colors">Message Us Directly</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white border border-[#EAE6DF] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#6B111A]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#1C1C1C] uppercase tracking-wider mb-1">Location</h4>
                  <p className="text-[#595959]">{ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Static Form */}
          <div className="bg-white p-10 border border-[#EAE6DF]">
            <h3 className="text-2xl font-serif text-[#1C1C1C] mb-6">Send an Inquiry</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:info@narsinghkitchen.com?subject=Inquiry from Website`; }}>
              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Name</label>
                <input type="text" className="w-full border border-[#EAE6DF] p-3 focus:outline-none focus:border-[#6B111A] bg-[#FDFBF7]" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Phone Number</label>
                <input type="tel" className="w-full border border-[#EAE6DF] p-3 focus:outline-none focus:border-[#6B111A] bg-[#FDFBF7]" placeholder="Your phone number" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Service of Interest</label>
                <select className="w-full border border-[#EAE6DF] p-3 focus:outline-none focus:border-[#6B111A] bg-[#FDFBF7]">
                  <option>Fast Food Order</option>
                  <option>Tiffin Subscription</option>
                  <option>Spices/Masale</option>
                  <option>General Inquiry</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium text-[#1C1C1C] mb-2">Message</label>
                <textarea rows="4" className="w-full border border-[#EAE6DF] p-3 focus:outline-none focus:border-[#6B111A] bg-[#FDFBF7]" placeholder="How can we help you?"></textarea>
              </div>
              <Button variant="primary" className="w-full">Submit Inquiry</Button>
            </form>
          </div>
        </div>
      </div>
    </section>

    {/* Map Placeholder */}
    <section className="h-[400px] w-full bg-[#EAE6DF] relative flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-[#6B111A] mx-auto mb-4 opacity-50" />
        <p className="text-[#595959] font-medium">Google Maps Embed Location Placeholder</p>
        <p className="text-sm text-[#595959]">{ADDRESS}</p>
      </div>
    </section>
  </div>
);

const LegalPage = ({ title, subtitle, intro, sections }) => (
  <div className="w-full pt-20">
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#6B111A] text-sm uppercase tracking-widest font-semibold mb-3">Legal Information</p>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1C1C1C] leading-tight">{title}</h2>
          <p className="text-[#595959] text-lg mt-6 max-w-3xl mx-auto">{subtitle}</p>
          <p className="text-sm text-[#595959] mt-4">{intro}</p>
        </div>

        <div className="bg-white border border-[#EAE6DF] shadow-sm divide-y divide-[#EAE6DF]">
          {sections.map((section, index) => (
            <div key={index} className="p-8 md:p-10">
              <h3 className="text-xl font-serif text-[#1C1C1C] mb-4">{section.title}</h3>
              {Array.isArray(section.content) ? (
                <ul className="space-y-3 text-[#595959] leading-relaxed">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#595959] leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const PrivacyPage = () => (
  <LegalPage
    title="Privacy Policy"
    subtitle="We respect your privacy and are committed to protecting the personal information you share with us."
    intro="Effective Date: 07 July 2026 | Website: narsinghkitchen.in | Business Name: Narsingh Kitchens & Tiffin"
    sections={[
      {
        title:"Effective Date",
        content:"07 July 2026"
      },
      {
        title:"Website",
        content:"narsinghkitchen.in"
      },
      {
        title:"Business Name",
        content:"Narsingh Kitchens & Tiffin"
      },
      {
        title:"Introduction",
        content:"Narsingh Kitchens & Tiffin values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website and future mobile application."
      },
      {
        title:"Information We Collect",
        content:"Name, Phone Number, Email Address, Delivery Address, Service Inquiry, Order Details, Feedback, WhatsApp Communication, Device Information (browser type, IP address, cookies if enabled)."
      },
      {
        title:"Purpose of Collection",
        content:"To process food orders, manage tiffin subscriptions, deliver products, respond to inquiries, improve services, communicate order updates, and provide customer support."
      },
      {
        title:"Payment Information",
        content:"Payments are processed through secure third-party payment gateways. We do not store your UPI PIN, banking credentials, or complete payment card details."
      },
      {
        title:"Cookies",
        content:"The website may use essential cookies to improve performance, remember user preferences, and enhance browsing experience."
      },
      {
        title:"Third-Party Services",
        content:"We may use Google Maps, WhatsApp, Email services, and secure payment gateways. These third-party services have their own privacy policies."
      },
      {
        title:"Data Sharing",
        content:"Customer information is never sold or rented. Information may only be shared with delivery partners, payment providers, or authorities when legally required."
      },
      {
        title:"Data Security",
        content:"Reasonable technical and organizational measures are implemented to protect customer data from unauthorized access, alteration, or disclosure. No internet transmission is 100% secure."
      },
      {
        title:"Data Retention",
        content:"Customer information is retained only as long as necessary for order fulfillment, legal obligations, or customer support."
      },
      {
        title:"Children's Privacy",
        content:"Services are not intended for children under 18 years of age without parental supervision."
      },
      {
        title:"User Rights",
        content:"Users may request correction, update, or deletion of personal information by contacting customer support."
      },
      {
        title:"Policy Updates",
        content:"This Privacy Policy may be updated periodically. Continued use of the website constitutes acceptance of the revised policy."
      },
      {
        title:"Contact",
        content:"nksupport@gmail.com, +91 70006 25689"
      }
    ]}
  />
);

const TermsPage = () => (
  <LegalPage
    title="Terms & Conditions"
    subtitle="By using our website, you agree to the terms outlined below for ordering, delivery, subscriptions, and support services."
    intro="Effective Date: 07 July 2026 | Website: narsinghkitchen.in | Business Name: Narsingh Kitchens & Tiffin"
    sections={[
      {
        title:"Acceptance of Terms",
        content:"By accessing or using the website, users agree to comply with these Terms & Conditions."
      },
      {
        title:"Services Offered",
        content:"Fast Food Ordering, Monthly Tiffin Subscription, Whole Spices Purchase, Customer Support, Future Mobile Application Services."
      },
      {
        title:"Eligibility",
        content:"Users must provide accurate information while placing orders or submitting inquiries."
      },
      {
        title:"Orders",
        content:"Orders are subject to availability and confirmation. Narsingh Kitchens & Tiffin reserves the right to refuse or cancel orders in exceptional circumstances."
      },
      {
        title:"Pricing",
        content:"Prices may change without prior notice. Promotional offers are valid only during the specified period."
      },
      {
        title:"Payments",
        content:"Accepted payment methods include UPI, Cash on Delivery, Net Banking, and supported digital wallets."
      },
      {
        title:"Delivery",
        content:"Estimated delivery times are approximate and may vary due to weather, traffic, festivals, or operational conditions."
      },
      {
        title:"Tiffin Subscription",
        content:"Subscription plans are available monthly. Delivery schedules and menu may vary based on operational requirements."
      },
      {
        title:"Whole Spices",
        content:"Product images are for representation purposes. Actual packaging or appearance may differ slightly."
      },
      {
        title:"Cancellation",
        content:"Cancellation requests are accepted only before food preparation or dispatch begins."
      },
      {
        title:"Refunds",
        content:"Refunds are processed only in eligible cases as defined in the Refund Policy."
      },
      {
        title:"Intellectual Property",
        content:"All logos, graphics, website content, text, branding, and images are the intellectual property of Narsingh Kitchens & Tiffin and may not be copied without written permission."
      },
      {
        title:"Website Usage",
        content:"Users must not misuse the website, attempt unauthorized access, upload malicious code, or interfere with website functionality."
      },
      {
        title:"Limitation of Liability",
        content:"The company shall not be liable for indirect, incidental, or consequential damages arising from use of the website or services."
      },
      {
        title:"External Links",
        content:"The website may contain links to third-party services. We are not responsible for their content or privacy practices."
      },
      {
        title:"Changes to Terms",
        content:"Terms & Conditions may be modified at any time. Updated versions will be published on the website."
      },
      {
        title:"Governing Law",
        content:"These Terms shall be governed by the laws of India. Any disputes shall fall under the jurisdiction of the competent courts in Bhopal, Madhya Pradesh."
      }
    ]}
  />
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Simple router simulation
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage navigate={setCurrentPage} />;
      case 'fastfood': return <FastFoodPage />;
      case 'tiffin': return <TiffinPage />;
      case 'spices': return <SpicesPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      default: return <HomePage navigate={setCurrentPage} />;
    }
  };

  return (
    <div className="font-sans text-[#1C1C1C] bg-[#FDFBF7] min-h-screen selection:bg-[#6B111A] selection:text-white flex flex-col">
      <Header currentPage={currentPage} navigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer navigate={setCurrentPage} />
      <FloatingContact />
    </div>
  );
}