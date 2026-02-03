/**
 * Loader Component Usage Examples
 * 
 * This file demonstrates different ways to use the Loader component
 * in your SorBit application.
 */

// ============================================
// EXAMPLE 1: Basic Loader (Medium Size)
// ============================================
// import Loader from '../components/ui/Loader';
// 
// function MyComponent() {
//   return <Loader />;
// }

// ============================================
// EXAMPLE 2: Small Loader with Text
// ============================================
// import Loader from '../components/ui/Loader';
// 
// function MyComponent() {
//   return <Loader size="small" text="Loading..." />;
// }

// ============================================
// EXAMPLE 3: Large Loader
// ============================================
// import Loader from '../components/ui/Loader';
// 
// function MyComponent() {
//   return <Loader size="large" text="Please wait..." />;
// }

// ============================================
// EXAMPLE 4: Fullscreen Loader
// ============================================
// import Loader from '../components/ui/Loader';
// 
// function MyComponent() {
//   const [isLoading, setIsLoading] = useState(true);
// 
//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => setIsLoading(false), 2000);
//   }, []);
// 
//   if (isLoading) {
//     return <Loader fullScreen text="Loading SorBit..." />;
//   }
// 
//   return <div>Your content here</div>;
// }

// ============================================
// EXAMPLE 5: Inline Loader in Dashboard
// ============================================
// import Loader from '../components/ui/Loader';
// 
// function Dashboard() {
//   const [loading, setLoading] = useState(true);
// 
//   return (
//     <div className="dashboard">
//       {loading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
//           <Loader size="medium" text="Loading dashboard..." />
//         </div>
//       ) : (
//         <div>Dashboard content</div>
//       )}
//     </div>
//   );
// }

// ============================================
// EXAMPLE 6: Button Loading State
// ============================================
// import { useState } from 'react';
// import Button from '../components/ui/Button';
// import Loader from '../components/ui/Loader';
// 
// function MyComponent() {
//   const [isSubmitting, setIsSubmitting] = useState(false);
// 
//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     // Perform async operation
//     await someAsyncFunction();
//     setIsSubmitting(false);
//   };
// 
//   return (
//     <Button onClick={handleSubmit} disabled={isSubmitting}>
//       {isSubmitting ? (
//         <Loader size="small" />
//       ) : (
//         'Submit'
//       )}
//     </Button>
//   );
// }

// ============================================
// EXAMPLE 7: Page Transition Loader
// ============================================
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import Loader from '../components/ui/Loader';
// 
// function App() {
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();
// 
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 500);
//     return () => clearTimeout(timer);
//   }, [location]);
// 
//   return (
//     <>
//       {loading && <Loader fullScreen />}
//       <Routes>
//         {/* Your routes */}
//       </Routes>
//     </>
//   );
// }

// ============================================
// EXAMPLE 8: Data Fetching with Loader
// ============================================
// import { useState, useEffect } from 'react';
// import Loader from '../components/ui/Loader';
// import { getAccounts } from '../services/api';
// 
// function AccountsList() {
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
// 
//   useEffect(() => {
//     async function loadAccounts() {
//       try {
//         setLoading(true);
//         const data = await getAccounts();
//         setAccounts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadAccounts();
//   }, []);
// 
//   if (loading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
//         <Loader size="large" text="Loading accounts..." />
//       </div>
//     );
//   }
// 
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
// 
//   return (
//     <div>
//       {accounts.map(account => (
//         <div key={account.id}>{account.name}</div>
//       ))}
//     </div>
//   );
// }

// ============================================
// EXAMPLE 9: Card Loading State
// ============================================
// import { useState } from 'react';
// import Card from '../components/ui/Card';
// import Loader from '../components/ui/Loader';
// 
// function StatCard({ title, value, loading }) {
//   return (
//     <Card>
//       {loading ? (
//         <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
//           <Loader size="small" />
//         </div>
//       ) : (
//         <>
//           <h3>{title}</h3>
//           <p>{value}</p>
//         </>
//       )}
//     </Card>
//   );
// }

// ============================================
// EXAMPLE 10: Image Loading with Loader
// ============================================
// import { useState } from 'react';
// import Loader from '../components/ui/Loader';
// 
// function ImageWithLoader({ src, alt }) {
//   const [loading, setLoading] = useState(true);
// 
//   return (
//     <div style={{ position: 'relative' }}>
//       {loading && (
//         <div style={{ 
//           position: 'absolute', 
//           top: '50%', 
//           left: '50%', 
//           transform: 'translate(-50%, -50%)' 
//         }}>
//           <Loader size="small" />
//         </div>
//       )}
//       <img 
//         src={src} 
//         alt={alt}
//         onLoad={() => setLoading(false)}
//         style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.3s' }}
//       />
//     </div>
//   );
// }

export default {};