import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Crown, 
  Star, 
  CheckCircle, 
  XCircle, 
  Clock, 
  CreditCard,
  Download,
  Zap,
  Music,
  Mic,
  Users,
  Lightbulb,
  BarChart3,
  FileText,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import PaymentAlert from './PaymentAlert';
import PaymentModal from './PaymentModal';

const UserVerification = () => {
  const [user, setUser] = useState({
    email: 'roizohar111@gmail.com',
    name: 'רועי זוהר',
    subscription: 'premium',
    status: 'active',
    expiresAt: '2025-12-31',
    features: ['vocal-analysis', 'sketches', 'sessions', 'recommendations', 'export', 'credits'],
    usage: {
      vocalAnalyses: 15,
      sketchesCreated: 8,
      sessionsActive: 2,
      exportsThisMonth: 12,
      projectsUsed: 1
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('verified');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const subscriptionTiers = {
    free: {
      name: 'חינמי',
      color: 'text-gray-500',
      icon: User,
      features: ['vocal-analysis'],
      limit: 1,
      limitType: 'projects'
    },
    basic: {
      name: 'בסיסי',
      color: 'text-blue-500',
      icon: Shield,
      features: ['vocal-analysis', 'sketches'],
      limit: 3,
      limitType: 'projects',
      price: 149,
      regularPrice: 299,
      isIntroPrice: true
    },
    premium: {
      name: 'פרימיום',
      color: 'text-purple-500',
      icon: Crown,
      features: ['vocal-analysis', 'sketches', 'sessions', 'recommendations', 'export', 'credits'],
      limit: 'unlimited',
      limitType: 'uses',
      price: 299,
      regularPrice: 499,
      isIntroPrice: true
    }
  };

  const features = {
    'vocal-analysis': { name: 'ניתוח ערוץ שירה', icon: Mic },
    'sketches': { name: 'יצירת סקיצות', icon: Music },
    'sessions': { name: 'ניהול סשנים', icon: Users },
    'recommendations': { name: 'המלצות הפקה', icon: Lightbulb },
    'export': { name: 'יצוא גרסאות', icon: BarChart3 },
    'credits': { name: 'קרדיטים וחוזים', icon: FileText },
    'priority-support': { name: 'תמיכה מועדפת', icon: Zap }
  };

  const handleVerifyUser = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerificationStatus('verified');
      setIsLoading(false);
    }, 2000);
  };

  const handleSubscribe = (subscription) => {
    setSelectedSubscription(subscription);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Update user subscription
    setUser(prev => ({
      ...prev,
      subscription: selectedSubscription.name === 'בסיסי' ? 'basic' : 'premium',
      status: 'active'
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'expired': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'expired': return XCircle;
      case 'pending': return Clock;
      default: return AlertTriangle;
    }
  };

  const currentTier = subscriptionTiers[user.subscription];
  const StatusIcon = getStatusIcon(user.status);

  return (
    <div className="flex-1 bg-studio-dark p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-2">
            <Shield className="w-8 h-8 text-white ml-3" />
            <h1 className="text-3xl font-bold text-white">אימות משתמש</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={handleVerifyUser}
            disabled={isLoading}
            className="text-white border-white hover:bg-white hover:text-studio-dark"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
            ) : (
              <Shield className="w-4 h-4 ml-2" />
            )}
            אימות מחדש
          </Button>
        </div>
        <p className="text-gray-400 text-lg">
          בדיקת סטטוס מנוי ותכונות זמינות
        </p>
      </div>

      {/* Payment Alert */}
      <PaymentAlert 
        status={
          (user.subscription === 'free' || user.subscription === 'basic') && 
          user.usage.projectsUsed >= subscriptionTiers[user.subscription].limit
            ? 'free-limit-reached'
            : user.status
        } 
        daysUntilExpiry={7} 
      />

      {/* Special Offer Alert */}
      <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">🔥</span>
          </div>
          <div className="flex-1">
            <h3 className="text-orange-400 font-semibold">מחירי היכרות מיוחדים!</h3>
            <p className="text-gray-300 text-sm mt-1">
              מחירים מוזלים לזמן מוגבל בלבד. מנוי בסיסי ₪149 במקום ₪299, מנוי פרימיום ₪299 במקום ₪499!
            </p>
            <div className="flex items-center mt-2 space-x-2 space-x-reverse">
              <span className="text-xs text-orange-400 font-medium">⏰ מוגבל ל-30 יום בלבד</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="bg-studio-gray border-studio-gray lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">פרופיל משתמש</CardTitle>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">R</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">אימייל</label>
              <p className="text-white font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">שם</label>
              <p className="text-white font-medium">{user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">סטטוס</label>
              <div className="flex items-center mt-1">
                <StatusIcon className={`w-4 h-4 ml-2 ${getStatusColor(user.status)}`} />
                <span className={`font-medium ${getStatusColor(user.status)}`}>
                  {user.status === 'active' ? 'פעיל' : 
                   user.status === 'expired' ? 'פג תוקף' : 
                   user.status === 'pending' ? 'ממתין לאימות' : 'לא ידוע'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card className="bg-studio-gray border-studio-gray lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">פרטי מנוי</CardTitle>
              <div className="flex items-center">
                <currentTier.icon className={`w-5 h-5 ml-2 ${currentTier.color}`} />
                <span className={`font-semibold ${currentTier.color}`}>{currentTier.name}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">תכונות זמינות</h4>
                <div className="space-y-2">
                  {currentTier.features.map((feature) => {
                    const FeatureIcon = features[feature]?.icon || Music;
                    return (
                      <div key={feature} className="flex items-center text-green-400">
                        <CheckCircle className="w-4 h-4 ml-2" />
                        <span className="text-sm">{features[feature]?.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">שימוש חודשי</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">ניתוחי שירה</span>
                    <span className="text-white font-medium">{user.usage.vocalAnalyses}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">סקיצות שנוצרו</span>
                    <span className="text-white font-medium">{user.usage.sketchesCreated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">סשנים פעילים</span>
                    <span className="text-white font-medium">{user.usage.sessionsActive}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">יצוא החודש</span>
                    <span className="text-white font-medium">{user.usage.exportsThisMonth}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-studio-dark">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">תוקף המנוי</span>
                <span className="text-white font-medium">{user.expiresAt}</span>
              </div>
              
              {/* Usage Progress for Free and Basic Tiers */}
              {(user.subscription === 'free' || user.subscription === 'basic') && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">שימוש בפרויקטים</span>
                    <span className="text-white text-sm font-medium">
                      {user.usage.projectsUsed} / {subscriptionTiers[user.subscription].limit}
                    </span>
                  </div>
                  <div className="w-full bg-studio-dark rounded-full h-2">
                    <div 
                      className="bg-studio-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(user.usage.projectsUsed / subscriptionTiers[user.subscription].limit) * 100}%` }}
                    ></div>
                  </div>
                  {user.usage.projectsUsed >= subscriptionTiers[user.subscription].limit && (
                    <p className="text-red-400 text-xs mt-1">
                      הגעת למגבלת הפרויקטים ב{user.subscription === 'free' ? 'המנוי החינמי' : 'המנוי הבסיסי'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Status */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <div className="flex items-center">
              <CreditCard className="w-5 h-5 text-white ml-2" />
              <CardTitle className="text-white">סטטוס תשלום</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">תשלום אחרון</span>
                <span className="text-white">01/01/2025</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">סכום</span>
                <span className="text-white">₪299/חודש</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">סטטוס</span>
                <span className="text-green-400 font-medium">שולם</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-studio-gray border-studio-gray">
          <CardHeader>
            <CardTitle className="text-white">פעולות מהירות</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-studio-dark">
                <Download className="w-4 h-4 ml-2" />
                הורד חשבונית
              </Button>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-studio-dark">
                <CreditCard className="w-4 h-4 ml-2" />
                עדכן אמצעי תשלום
              </Button>
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-studio-dark">
                <Shield className="w-4 h-4 ml-2" />
                שנה סיסמה
              </Button>
              {(user.subscription === 'free' || user.subscription === 'basic') && (
                <Button 
                  variant="studio" 
                  className="w-full"
                  onClick={() => handleSubscribe(subscriptionTiers.premium)}
                >
                  <Crown className="w-4 h-4 ml-2" />
                  שדרג למנוי בתשלום
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <Card className="bg-studio-gray border-studio-gray lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">תוכניות מנוי</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(subscriptionTiers).map(([key, tier]) => {
                const TierIcon = tier.icon;
                const isCurrent = user.subscription === key;
                return (
                  <div 
                    key={key}
                    className={`p-4 rounded-lg border-2 ${
                      isCurrent 
                        ? 'border-studio-primary bg-studio-primary/10' 
                        : 'border-studio-dark bg-studio-dark'
                    }`}
                  >
                    <div className="flex items-center mb-3">
                      <TierIcon className={`w-5 h-5 ml-2 ${tier.color}`} />
                      <span className={`font-semibold ${tier.color}`}>{tier.name}</span>
                      {isCurrent && <CheckCircle className="w-4 h-4 text-green-500 mr-auto" />}
                    </div>
                                       <div className="text-sm text-gray-400 mb-3">
                     {tier.limit === 'unlimited' 
                       ? 'ללא הגבלה' 
                       : tier.limitType === 'projects' 
                         ? `עד ${tier.limit} פרויקט` 
                         : `עד ${tier.limit} שימושים`
                     }
                   </div>
                   {tier.price && (
                     <div className="mb-3">
                       <div className="flex items-center justify-between">
                         <span className="text-lg font-bold text-white">₪{tier.price}</span>
                         <span className="text-xs text-gray-400">/חודש</span>
                       </div>
                       {tier.isIntroPrice && (
                         <div className="flex items-center mt-1">
                           <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                             מחיר היכרות מוגבל בזמן!
                           </span>
                         </div>
                       )}
                       {tier.isIntroPrice && tier.name === 'בסיסי' && (
                         <div className="flex items-center mt-1">
                           <span className="text-xs text-gray-400 line-through">₪{tier.regularPrice}</span>
                           <span className="text-xs text-green-400 mr-2">חיסכון של ₪{tier.regularPrice - tier.price}!</span>
                         </div>
                       )}
                       {tier.isIntroPrice && tier.name === 'פרימיום' && (
                         <div className="flex items-center mt-1">
                           <span className="text-xs text-gray-400 line-through">₪{tier.regularPrice}</span>
                           <span className="text-xs text-green-400 mr-2">חיסכון של ₪{tier.regularPrice - tier.price}!</span>
                         </div>
                       )}
                     </div>
                   )}
                    <div className="space-y-1">
                      {tier.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-center text-xs text-gray-300">
                          <CheckCircle className="w-3 h-3 ml-1" />
                          {features[feature]?.name}
                        </div>
                      ))}
                                             {tier.features.length > 3 && (
                         <div className="text-xs text-gray-500">+{tier.features.length - 3} תכונות נוספות</div>
                       )}
                     </div>
                     {tier.price && (
                       <Button 
                         variant={isCurrent ? "outline" : "studio"}
                         size="sm"
                         className={`w-full mt-3 ${
                           isCurrent 
                             ? 'text-white border-white hover:bg-white hover:text-studio-dark' 
                             : ''
                         }`}
                         onClick={isCurrent ? undefined : () => handleSubscribe(tier)}
                       >
                         {isCurrent ? 'המנוי הנוכחי' : 'הזמן עכשיו'}
                       </Button>
                     )}
                   </div>
                 );
               })}
            </div>
          </CardContent>
                 </Card>
       </div>

       {/* Payment Modal */}
       <PaymentModal
         isOpen={showPaymentModal}
         onClose={() => setShowPaymentModal(false)}
         subscription={selectedSubscription}
         onPaymentSuccess={handlePaymentSuccess}
       />
     </div>
   );
 };

export default UserVerification; 