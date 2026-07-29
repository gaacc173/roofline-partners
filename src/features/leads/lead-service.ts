import { toStoredLead, type LeadSource, type LeadSubmission } from "./lead-schema";
import type { LeadRepository } from "./lead-repository";

export class LeadSubmissionService {
  constructor(private readonly repository: LeadRepository) {}

  async submit(submission: LeadSubmission, source: LeadSource): Promise<{ id: string }> {
    const lead = toStoredLead(submission, source);
    return this.repository.create(lead);
  }
}
