'use client';

import { useState, useEffect } from 'react';
import usePushNotifications from '../../hooks/usePushNotifications';

const PushNotificationButton = () => {
  const {
    isSupported,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
    requestPermission
  } = usePushNotifications();

  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('notification-dismissed');
    if (isDismissed === 'true' && !isSubscribed) {
      // Show again after 24 hours if not subscribed (production)
      const dismissTime = localStorage.getItem('notification-dismiss-time');
      if (dismissTime && Date.now() - parseInt(dismissTime) > 24 * 60 * 60 * 1000) {
        setDismissed(false);
        localStorage.removeItem('notification-dismissed');
        localStorage.removeItem('notification-dismiss-time');
      } else {
        setDismissed(true);
      }
    }
  }, [isSubscribed]);

  const handleSubscribe = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setShowPrompt(false);
        setDismissed(true);
        localStorage.setItem('notification-dismissed', 'true');
        localStorage.setItem('notification-dismiss-time', Date.now().toString());
        return;
      }

      await subscribe();
      setShowPrompt(false);
      setDismissed(true);
      localStorage.setItem('notification-dismissed', 'true');
    } catch (error) {
      console.error('Subscription failed:', error);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowPrompt(false);
    localStorage.setItem('notification-dismissed', 'true');
    localStorage.setItem('notification-dismiss-time', Date.now().toString());
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribe();
      setDismissed(true);
      localStorage.setItem('notification-dismissed', 'true');
      localStorage.setItem('notification-dismiss-time', Date.now().toString());
    } catch (error) {
      console.error('Unsubscription failed:', error);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="push-notification-container">
      {!isSubscribed && !showPrompt && !dismissed && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-blue-700">
                সর্বশেষ সংবাদের নোটিফিকেশন পেতে চান?
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => setShowPrompt(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
              >
                হ্যাঁ
              </button>
              <button
                onClick={handleDismiss}
                className="ml-2 text-blue-600 hover:text-blue-800 text-sm px-3 py-1"
              >
                না
              </button>
            </div>
          </div>
        </div>
      )}

      {showPrompt && !isSubscribed && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-green-800">
                নোটিফিকেশন চালু করুন
              </h3>
              <p className="text-sm text-green-700 mt-1">
                ব্রেকিং নিউজ এবং গুরুত্বপূর্ণ সংবাদের তাৎক্ষণিক আপডেট পান
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm px-4 py-2 rounded"
              >
                {isLoading ? 'চালু করা হচ্ছে...' : 'চালু করুন'}
              </button>
              <button
                onClick={handleDismiss}
                className="ml-2 text-green-600 hover:text-green-800 text-sm px-3 py-2"
              >
                বাতিল
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PushNotificationButton;