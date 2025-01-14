import { CDP_DOCS } from './docs-data';

// Define interfaces for better type safety
interface TopicPattern {
  topic: string;
  patterns: string[];
}

interface ConversationContext {
  platform: string | null;
  topic: string | null;
}

interface CDPDocs {
  [key: string]: {
    topics: {
      [key: string]: {
        title: string;
        steps: string[];
      };
    };
    baseUrl: string;
  };
}

// Type assertion for CDP_DOCS
const typedCDPDocs = CDP_DOCS as CDPDocs;

const TOPIC_PATTERNS: Record<string, TopicPattern[]> = {
  segment: [
    {
      topic: 'sources',
      patterns: ['set up a source', 'create source', 'add source', 'new source', 'setup source']
    },
    {
      topic: 'destinations',
      patterns: ['set up destination', 'add destination', 'configure destination', 'new destination']
    }
  ],
  mparticle: [
    {
      topic: 'profile',
      patterns: ['create profile', 'user profile', 'set up profile', 'manage profile']
    },
    {
      topic: 'events',
      patterns: ['track events', 'event tracking', 'log events', 'send events']
    }
  ],
  lytics: [
    {
      topic: 'audience',
      patterns: ['build audience', 'create segment', 'audience segment', 'segmentation']
    }
  ],
  zeotap: [
    {
      topic: 'integration',
      patterns: ['integrate data', 'data integration', 'connect data', 'setup integration']
    }
  ]
};

export function identifyPlatform(message: string): string | null {
  const lowercaseMessage = message.toLowerCase();

  const platformPatterns: { platform: string; keywords: string[] }[] = [
    { platform: 'lytics', keywords: ['audience', 'build audience', 'create segment', 'segmentation', 'lytics'] },
    { platform: 'segment', keywords: ['source', 'destination', 'segment'] }
  ];

  for (const { platform, keywords } of platformPatterns) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return platform;
    }
  }

  const platforms = Object.keys(typedCDPDocs);
  for (const platform of platforms) {
    if (lowercaseMessage.includes(platform.toLowerCase())) {
      return platform;
    }
  }

  return null;
}

export function identifyTopic(platform: string, message: string): string | null {
  const lowercaseMessage = message.toLowerCase();

  const topics = Object.keys(typedCDPDocs[platform]?.topics || {});
  const exactTopic = topics.find(topic => lowercaseMessage.includes(topic.toLowerCase()));
  
  if (exactTopic) {
    return exactTopic;
  }

  const patterns = TOPIC_PATTERNS[platform];
  const matchedPattern = patterns?.find(pattern => 
    pattern.patterns.some(p => lowercaseMessage.includes(p.toLowerCase()))
  );

  return matchedPattern?.topic || null;
}

interface GenerateResponseResult {
  response: string;
  updatedContext: ConversationContext;
}

export function generateResponse(message: string, context: ConversationContext): GenerateResponseResult {
  const detectedPlatform = identifyPlatform(message);
  let currentPlatform = detectedPlatform || context.platform;

  if (!currentPlatform) {
    return {
      response: listAvailablePlatforms(),
      updatedContext: { platform: null, topic: null }
    };
  }

  if (detectedPlatform && detectedPlatform !== context.platform) {
    context = { platform: detectedPlatform, topic: null };
  }

  const topic = identifyTopic(currentPlatform, message);
  if (topic) {
    return {
      response: generateTopicResponse(currentPlatform, topic),
      updatedContext: { ...context, topic }
    };
  }

  return {
    response: listAvailableTopics(currentPlatform),
    updatedContext: context
  };
}

function listAvailablePlatforms(): string {
  const platforms = Object.keys(typedCDPDocs).join(', ');
  return `I can help you with ${platforms}. Which platform would you like to know about?`;
}

function listAvailableTopics(platform: string): string {
  const topics = Object.keys(typedCDPDocs[platform]?.topics || {})
    .map(t => `"${t}"`)
    .join(', ');
  return `For ${platform}, I can help you with: ${topics}. What would you like to know?`;
}

function generateTopicResponse(platform: string, topic: string): string {
  const topicData = typedCDPDocs[platform]?.topics[topic];
  
  if (!topicData) {
    return `Sorry, I couldn't find information about ${topic} for ${platform}.`;
  }

  const steps = topicData.steps
    .map((step, index) => `${index + 1}. ${step}`)
    .join('\n');
  
  return `Here's how to ${topicData.title} in ${platform}:\n\n${steps}\n\nFor more details, visit: ${typedCDPDocs[platform].baseUrl}`;
}

export type { ConversationContext };