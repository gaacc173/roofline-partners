import { toStoredLead, type LeadSource, type LeadSubmission } from "./lead-schema";
import type { LeadNotificationService } from "./notification-service";
import type { LeadRepository } from "./lead-repository";

export class LeadSubmissionService {
  constructor(
    private readonly repository: LeadRepository,
    private readonly notifier: LeadNotificationService,
  ) {}

  async submit(submission: LeadSubmission, source: LeadSource): Promise<{ id: string }> {
    const lead = toStoredLead(submission, source);
    const result = await this.repository.create(lead);

    try {
      await this.notifier.notifyNewLead(lead);
    } catch (error) {
      console.error("Lead notification failed after storage.", { leadId: result.id, error });
    }

    return result;
  }
}
