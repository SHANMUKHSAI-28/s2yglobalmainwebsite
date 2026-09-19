import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut, KeyRound, CheckCircle2, AlertCircle, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/authService';
import { Link } from 'react-router-dom';
import './Account.css';

export default function Account() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      async function loadOrders() {
        setLoadingOrders(true);
        try {
          const userOrders = await getMyOrders();
          setOrders(userOrders);
        } catch (err) {
          setOrdersError(err.message || 'Could not load your orders');
        } finally {
          setLoadingOrders(false);
        }
      }
      loadOrders();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <main className="account-page">
        <SEO 
          title="My Account | S2Y Global & S2Y Pure"
          description="Sign in or view your customer account, order history, and delivery details for S2Y Pure."
        />
        <div className="container">
          <div className="account-guest-view">
            <div className="account-guest-icon">
              <User size={34} />
            </div>
            <h2>Sign In to Your Account</h2>
            <p>
              Access your order history, tracking details, and saved delivery addresses for 
              <strong> S2Y Pure</strong> purchases. Uses secure, password-less Email OTP verification.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="account-guest-btn" onClick={() => openAuthModal('login')}>
                <span>Sign In via Email OTP</span>
                <ArrowRight size={16} />
              </button>
              <button 
                className="account-guest-btn" 
                style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }} 
                onClick={() => openAuthModal('register')}
              >
                <span>Create New Account</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const initial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <main className="account-page">
      <SEO 
        title={`My Account (${user?.name || 'Customer'}) | S2Y Global`}
        description="Manage your S2Y Pure account, view past orders, and verify saved shipping addresses."
      />
      <div className="container account-container">
        <div className="account-header">
          <span className="account-header__tag">Customer Portal</span>
          <h1 className="account-header__title">Welcome, {user?.name}</h1>
        </div>

        <div className="account-grid">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <div className="account-profile-box">
              <div className="account-avatar">{initial}</div>
              <h3 className="account-name">{user?.name}</h3>
              <p className="account-email">{user?.email}</p>
              {user?.phone && (
                <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', marginTop: '0.2rem' }}>
                  {user.phone}
                </p>
              )}
            </div>

            <nav className="account-nav">
              <button
                className={`account-nav__item ${activeTab === 'orders' ? 'account-nav__item--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} />
                <span>My Orders</span>
              </button>
              <button
                className={`account-nav__item ${activeTab === 'profile' ? 'account-nav__item--active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <MapPin size={18} />
                <span>Saved Addresses</span>
              </button>
              <button className="account-nav__item account-nav__item--logout" onClick={logout}>
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Tab Content */}
          <section className="account-content">
            {activeTab === 'orders' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff' }}>
                    Order History
                  </h3>
                  <Link to="/pure" style={{ fontSize: '0.85rem', color: 'var(--color-pure)', textDecoration: 'underline' }}>
                    Order More Products
                  </Link>
                </div>

                {loadingOrders ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--color-gray-400)' }}>
                    <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto 0.5rem' }} />
                    <p>Loading your orders...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--color-gray-400)' }}>
                    <ShoppingBag size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '1rem', color: 'var(--color-white)', marginBottom: '0.5rem' }}>
                      No orders placed yet
                    </p>
                    <p style={{ fontSize: '0.85rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                      When you purchase S2Y Pure products, your orders and tracking details will appear here.
                    </p>
                    <Link to="/pure" className="account-guest-btn">
                      Browse S2Y Pure Store
                    </Link>
                  </div>
                ) : (
                  <div className="account-orders-list">
                    {orders.map((order) => (
                      <div key={order._id || order.orderId} className="account-order-card">
                        <div className="account-order-header">
                          <div>
                            <span className="account-order-id">#{order.orderId}</span>
                            <span style={{ color: 'var(--color-gray-400)', marginLeft: '0.75rem', fontSize: '0.8rem' }}>
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <span className="account-order-status">{order.orderStatus || 'Placed'}</span>
                        </div>

                        <div>
                          {order.items?.map((item, idx) => (
                            <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-gray-300)', marginBottom: '0.25rem' }}>
                              • {item.productName} ({item.weight}) × {item.quantity} — ₹{item.price * item.quantity}
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.6rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.88rem' }}>
                          <span style={{ color: 'var(--color-gray-400)' }}>
                            Payment: <strong style={{ color: '#fff', textTransform: 'uppercase' }}>{order.paymentStatus}</strong>
                          </span>
                          <span style={{ fontWeight: 700, color: 'var(--color-pure)', fontSize: '1.05rem' }}>
                            Total: ₹{order.total}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#fff', marginBottom: '1.25rem' }}>
                  Saved Delivery Addresses
                </h3>

                {user.addresses && user.addresses.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {user.addresses.map((addr, idx) => (
                      <div key={idx} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <strong style={{ color: '#fff', fontSize: '0.9rem' }}>{addr.label || 'Default Address'}</strong>
                          {addr.isDefault && (
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-pure)', background: 'rgba(132,204,22,0.15)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                              DEFAULT
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-300)', lineHeight: '1.5' }}>
                          {addr.line1} {addr.line2 ? `, ${addr.line2}` : ''}<br />
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: 'var(--color-gray-400)', fontSize: '0.9rem' }}>
                    No addresses saved yet. Your shipping address will be automatically saved when you complete an order.
                  </p>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
