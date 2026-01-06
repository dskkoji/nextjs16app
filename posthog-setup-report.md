# PostHog post-wizard report

The wizard has completed a deep integration of your DevEvent Next.js project. PostHog has been configured using the recommended `instrumentation-client.ts` approach for Next.js 16.1.1 (15.3+), with a reverse proxy setup for improved reliability. The integration includes client-side event tracking for key user interactions, automatic pageview capturing, session replay, and error tracking via exception capture.

## Integration Summary

### Files Created
- `.env.local` - Environment variables for PostHog API key and host
- `instrumentation-client.ts` - Client-side PostHog initialization with automatic pageviews, session replay, and error tracking

### Files Modified
- `next.config.ts` - Added PostHog reverse proxy rewrites for improved tracking reliability
- `components/ExploreBtn.tsx` - Added `explore_events_clicked` event capture
- `components/EventCard.tsx` - Added `event_card_clicked` event capture with event properties
- `components/Navbar.tsx` - Added `navbar_link_clicked` event capture with link properties

## Events Tracked

| Event Name | Description | File |
|------------|-------------|------|
| `explore_events_clicked` | User clicked the Explore Events button to scroll to the events section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details | `components/EventCard.tsx` |
| `navbar_link_clicked` | User clicked a navigation link in the navbar | `components/Navbar.tsx` |

## Event Properties

### `explore_events_clicked`
- `button_id`: The button element ID
- `target_section`: The target section being navigated to

### `event_card_clicked`
- `event_title`: Title of the clicked event
- `event_slug`: URL slug of the event
- `event_location`: Location of the event
- `event_date`: Date of the event
- `event_time`: Time of the event

### `navbar_link_clicked`
- `link_name`: Name of the navigation link
- `link_href`: Href destination of the link

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/279253/dashboard/978190) - Main dashboard with all key metrics

### Insights
- [Event Card Clicks Over Time](https://us.posthog.com/project/279253/insights/B0k8vKZQ) - Track daily event card engagement
- [Explore Button Engagement](https://us.posthog.com/project/279253/insights/RKM2QcXx) - Monitor top-of-funnel interest
- [Navigation Patterns](https://us.posthog.com/project/279253/insights/swnAkb4A) - See which nav links are most popular
- [Explore to Event View Funnel](https://us.posthog.com/project/279253/insights/bwb323vq) - Conversion from exploration to event selection
- [Most Popular Events](https://us.posthog.com/project/279253/insights/6kLAkhQF) - Discover which developer events get the most clicks

## Additional Features Enabled

- **Automatic Pageviews**: PostHog will automatically capture page views using the `defaults: '2025-05-24'` configuration
- **Session Replay**: User sessions are recorded for playback and analysis
- **Error Tracking**: Unhandled exceptions are automatically captured via `capture_exceptions: true`
- **Reverse Proxy**: Events are routed through `/ingest` to improve reliability and reduce ad-blocker interference
