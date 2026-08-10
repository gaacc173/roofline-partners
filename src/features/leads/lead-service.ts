import { toStoredLead, type LeadSubmission } from "./lead-schema";
import type { LeadRepository } from "./lead-repository";

export class LeadSubmissionService {
  constructor(private readonly repository: LeadRepository) {}

  async submit(submission: LeadSubmission): Promise<{ id: string }> {
    const lead = toStoredLead(submission);
    return this.repository.create(lead);
  }
}
