// Referral and sharing system utilities

export const parseReferralParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    referralCode: urlParams.get('ref'),
    creator: urlParams.get('creator'),
    amount: urlParams.get('amount'),
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign')
  };
};

export const generateReferralCode = (transactionId) => {
  // Generate a unique referral code based on transaction
  return transactionId.slice(-8).toUpperCase();
};

export const trackReferral = (referralData) => {
  // Store referral information in localStorage for analytics
  const referrals = JSON.parse(localStorage.getItem('referralData') || '[]');
  const newReferral = {
    ...referralData,
    timestamp: new Date().toISOString(),
    id: Math.random().toString(36).substr(2, 9)
  };

  referrals.push(newReferral);
  localStorage.setItem('referralData', JSON.stringify(referrals));

  return newReferral;
};

export const updateMetaTags = (creator, amount, referralCode) => {
  // Dynamically update meta tags for better sharing
  const title = `Join me in supporting ${creator} on PinPeer!`;
  const description = `I just pinned ${creator} with ${amount} STX. Join the creator economy revolution and support amazing creators in the Stacks ecosystem.`;
  const url = `${window.location.origin}?ref=${referralCode}&creator=${creator.replace(/\s+/g, '-').toLowerCase()}&amount=${amount}`;

  // Update document title
  document.title = title;

  // Update meta tags
  updateMetaTag('description', description);
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:url', url);
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:url', url);
};

const updateMetaTag = (property, content) => {
  // Helper function to update individual meta tags
  let selector = property.startsWith('og:') || property.startsWith('twitter:')
    ? `meta[property="${property}"]`
    : `meta[name="${property}"]`;

  let element = document.querySelector(selector);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    if (property.startsWith('og:') || property.startsWith('twitter:')) {
      element.setAttribute('property', property);
    } else {
      element.setAttribute('name', property);
    }
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

export const getGamificationRewards = (referralCount = 0, totalDonated = 0) => {
  // Calculate user level and rewards based on activity
  const level = Math.floor((referralCount * 10 + totalDonated) / 50) + 1;
  const nextLevelPoints = (level * 50) - (referralCount * 10 + totalDonated);

  const badges = [];
  if (referralCount >= 1) badges.push({ id: 'first_share', name: 'First Share', emoji: '🚀' });
  if (referralCount >= 5) badges.push({ id: 'social_butterfly', name: 'Social Butterfly', emoji: '🦋' });
  if (referralCount >= 10) badges.push({ id: 'influencer', name: 'Influencer', emoji: '⭐' });
  if (totalDonated >= 100) badges.push({ id: 'generous_supporter', name: 'Generous Supporter', emoji: '💎' });
  if (totalDonated >= 500) badges.push({ id: 'whale_supporter', name: 'Whale Supporter', emoji: '🐋' });

  return {
    level,
    nextLevelPoints,
    badges,
    totalPoints: referralCount * 10 + totalDonated,
    referralBonus: referralCount * 5 // Bonus points for referrals
  };
};

export const showReferralNotification = (referrerInfo) => {
  // Show a notification when user arrives via referral
  if (referrerInfo.referralCode) {
    const notification = {
      type: 'referral',
      title: 'Welcome to PinPeer! 🎉',
      message: `You've been invited to join the creator economy revolution!`,
      action: 'Get Started',
      bonus: '+5 Rep Points for joining!'
    };

    // Store notification to show in UI
    sessionStorage.setItem('welcomeNotification', JSON.stringify(notification));
    return notification;
  }

  return null;
};

export const calculateShareRewards = (shareCount) => {
  // Calculate rewards for sharing
  const baseReward = 10;
  const bonusMultiplier = Math.floor(shareCount / 5) + 1;
  const totalReward = baseReward * bonusMultiplier;

  const milestones = [
    { count: 1, reward: 'First Share Badge', emoji: '🚀' },
    { count: 5, reward: 'Social Connector Badge', emoji: '🌐' },
    { count: 10, reward: 'Community Builder Badge', emoji: '🏗️' },
    { count: 25, reward: 'Viral Ambassador Badge', emoji: '👑' }
  ];

  const earnedMilestones = milestones.filter(m => shareCount >= m.count);
  const nextMilestone = milestones.find(m => shareCount < m.count);

  return {
    pointsEarned: totalReward,
    earnedMilestones,
    nextMilestone,
    sharesUntilNext: nextMilestone ? nextMilestone.count - shareCount : 0
  };
};