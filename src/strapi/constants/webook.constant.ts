export const enum StrapiWebhookEvent {
  ENTRY_CREATE = 'entry.create',
  ENTRY_UPDATE = 'entry.update',
  ENTRY_DELETE = 'entry.delete',
  ENTRY_PUBLISH = 'entry.publish',
  ENTRY_UNPUBLISH = 'entry.unpublish',
}

export const EventToClearCache = [
  StrapiWebhookEvent.ENTRY_CREATE,
  StrapiWebhookEvent.ENTRY_UPDATE,
  StrapiWebhookEvent.ENTRY_DELETE,
  StrapiWebhookEvent.ENTRY_PUBLISH,
  StrapiWebhookEvent.ENTRY_UNPUBLISH,
];
