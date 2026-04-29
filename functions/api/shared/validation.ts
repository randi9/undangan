/**
 * Zod Validation Schemas for API Input
 *
 * Centralized validation for all API endpoints.
 * Usage: `const data = rsvpCreateSchema.parse(await request.json())`
 */
import { z } from "zod";

// ============================================
// RSVP
// ============================================
export const rsvpCreateSchema = z.object({
  invitation_id: z.string().uuid("invitation_id harus UUID valid"),
  guest_name: z
    .string()
    .trim()
    .min(1, "Nama tamu wajib diisi")
    .max(100, "Nama tamu maksimal 100 karakter"),
  attendance: z.enum(["hadir", "tidak_hadir", "ragu"], {
    errorMap: () => ({ message: "Nilai attendance tidak valid" }),
  }),
  guest_count: z.coerce.number().int().min(1).max(10).default(1),
  message: z.string().max(500, "Pesan maksimal 500 karakter").default(""),
});

export const rsvpUpdateSchema = z.object({
  is_hidden: z.boolean().optional(),
  reply_text: z.string().max(500).optional(),
});

// ============================================
// Invitations
// ============================================
const slugRegex = /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/;

export const invitationCreateSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "Slug minimal 3 karakter")
    .max(64, "Slug maksimal 64 karakter")
    .regex(slugRegex, "Slug hanya boleh huruf kecil, angka, dan strip"),
  theme: z.enum(["elegant", "minimalist", "floral", "elegant_blue", "floral_blue"]),
  groom_name: z
    .string()
    .trim()
    .min(1, "Nama mempelai pria wajib diisi")
    .max(50, "Nama mempelai pria maksimal 50 karakter"),
  bride_name: z
    .string()
    .trim()
    .min(1, "Nama mempelai wanita wajib diisi")
    .max(50, "Nama mempelai wanita maksimal 50 karakter"),
  // Optional fields
  groom_full_name: z.string().max(100).optional().default(""),
  bride_full_name: z.string().max(100).optional().default(""),
  groom_father: z.string().max(100).optional().default(""),
  groom_mother: z.string().max(100).optional().default(""),
  bride_father: z.string().max(100).optional().default(""),
  bride_mother: z.string().max(100).optional().default(""),
  groom_photo: z.string().optional().default(""),
  bride_photo: z.string().optional().default(""),
  cover_photo: z.string().optional().default(""),
  akad_date: z.string().optional().default(""),
  akad_time: z.string().optional().default(""),
  akad_venue: z.string().max(200).optional().default(""),
  akad_address: z.string().max(300).optional().default(""),
  akad_map_url: z.string().optional().default(""),
  resepsi_date: z.string().optional().default(""),
  resepsi_time: z.string().optional().default(""),
  resepsi_venue: z.string().max(200).optional().default(""),
  resepsi_address: z.string().max(300).optional().default(""),
  resepsi_map_url: z.string().optional().default(""),
  quote: z.string().max(500).optional().default(""),
  bank_name: z.string().max(100).optional().default(""),
  bank_account: z.string().max(50).optional().default(""),
  bank_holder: z.string().max(100).optional().default(""),
  music_url: z.string().optional().default(""),
  banks: z.array(z.any()).optional(),
  wa_message: z.string().max(1000).optional().default(""),
  gallery_type: z.enum(["carousel", "masonry"]).optional(),
  love_story: z.array(z.any()).optional(),
  streaming_enabled: z.boolean().optional().default(false),
  streaming_platform: z.string().max(50).optional().default(""),
  streaming_url: z.string().optional().default(""),
  photos: z.array(z.any()).optional(),
});

// For updates, all fields are optional
export const invitationUpdateSchema = invitationCreateSchema.partial();

// ============================================
// Payment
// ============================================
export const paymentCreateInvoiceSchema = z.object({
  invitation_id: z.string().uuid("invitation_id harus UUID valid"),
});

export const paymentVerifyLicenseSchema = z.object({
  licenseCode: z.string().optional(),
  transaction_id: z.string().optional(),
  id: z.string().optional(),
  invitation_id: z.string().optional(),
  payment_token: z.string().optional(),
  productId: z.string().optional(),
  email: z.string().optional(),
});

// ============================================
// Guests
// ============================================
export const guestBulkSchema = z.object({
  guests: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(100),
        phone_number: z.string().max(20).default(""),
      }),
    )
    .min(1, "Minimal 1 tamu")
    .max(500, "Maksimal 500 tamu sekaligus"),
});

// ============================================
// Voucher
// ============================================
export const voucherRedeemSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "Kode voucher wajib diisi")
    .max(50),
  invitation_id: z.string().uuid().optional(),
});

/**
 * Helper: safely parse and return typed data, or throw descriptive error
 */
export function validateBody<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0];
    const message = firstError
      ? `${firstError.path.join(".")}: ${firstError.message}`
      : "Input tidak valid";
    throw new ValidationError(message, result.error.issues);
  }
  return result.data;
}

export class ValidationError extends Error {
  public readonly issues: z.ZodIssue[];
  constructor(message: string, issues: z.ZodIssue[]) {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
  }
}
