export const CDP_DOCS = {
  segment: {
    baseUrl: 'https://segment.com/docs/',
    topics: {
      sources: {
        title: 'set up a new source',
        steps: [
          'Go to Sources > Add Source in your Segment workspace',
          'Choose your source type from the catalog',
          'Configure the source settings',
          'Add the source to a workspace',
          'Follow source-specific setup instructions'
        ]
      },
      destinations: {
        title: 'add a destination',
        steps: [
          'Navigate to Destinations > Add Destination',
          'Select a destination from the catalog',
          'Choose the source to connect',
          'Configure destination settings',
          'Enable the destination'
        ]
      }
    }
  },
  mparticle: {
    baseUrl: 'https://docs.mparticle.com/',
    topics: {
      profile: {
        title: 'create a user profile',
        steps: [
          'Access your mParticle dashboard',
          'Navigate to Audience Builder',
          'Click "Create New Profile"',
          'Define profile attributes',
          'Set identity matching rules'
        ]
      },
      events: {
        title: 'track events',
        steps: [
          'Implement mParticle SDK',
          'Initialize the SDK with your API key',
          'Define custom event types',
          'Call logEvent with event data',
          'Verify events in Live Stream'
        ]
      }
    }
  },
  lytics: {
    baseUrl: 'https://docs.lytics.com/',
    topics: {
      audience: {
        title: 'build an audience segment',
        steps: [
          'Go to Audiences in Lytics',
          'Click "Create New Audience"',
          'Define segment criteria',
          'Set behavioral rules',
          'Save and activate the audience'
        ]
      }
    }
  },
  zeotap: {
    baseUrl: 'https://docs.zeotap.com/',
    topics: {
      integration: {
        title: 'integrate data',
        steps: [
          'Access Zeotap CDP',
          'Go to Integrations',
          'Select data source type',
          'Configure connection settings',
          'Map data fields'
        ]
      }
    }
  }
};