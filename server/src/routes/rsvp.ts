import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../database";

const router = Router();
const validAttendance = new Set(["hadir", "tidak_hadir"]);

function normalizeGuestCount(value: unknown): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return 1;
  const rounded = Math.floor(num);
  return Math.min(10, Math.max(1, rounded));
}

// Get RSVPs for an invitation
router.get("/:invitationId", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("rsvps")
      .select("*")
      .eq("invitation_id", req.params.invitationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch RSVPs" });
  }
});

// Submit RSVP
router.post("/", async (req: Request, res: Response) => {
  try {
    const { invitation_id, guest_name, attendance, guest_count, message } =
      req.body;

    if (!invitation_id || !guest_name || !attendance) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (
      typeof guest_name !== "string" ||
      guest_name.trim().length < 2 ||
      guest_name.trim().length > 120
    ) {
      return res.status(400).json({ error: "guest_name is invalid" });
    }

    if (typeof attendance !== "string" || !validAttendance.has(attendance)) {
      return res
        .status(400)
        .json({ error: "attendance must be hadir or tidak_hadir" });
    }

    if (
      message !== undefined &&
      (typeof message !== "string" || message.length > 1000)
    ) {
      return res.status(400).json({ error: "message is invalid" });
    }

    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          id: uuidv4(),
          invitation_id,
          guest_name: guest_name.trim(),
          attendance,
          guest_count: normalizeGuestCount(guest_count),
          message: typeof message === "string" ? message.trim() : "",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to submit RSVP" });
  }
});

export default router;
