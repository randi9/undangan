import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import supabase from "../database";
import { requireAuth } from "./auth";

const router = Router();

// Get all guests for an invitation
router.get("/:invitationId", requireAuth, async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("invitation_id", req.params.invitationId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch guests" });
  }
});

// Bulk insert guests
router.post("/:invitationId/bulk", requireAuth, async (req: Request, res: Response) => {
  try {
    const { guests } = req.body;
    const invitationId = req.params.invitationId;

    if (!Array.isArray(guests) || guests.length === 0) {
      return res.status(400).json({ error: "Invalid guests array" });
    }

    const payload = guests.map((g: any) => ({
      id: uuidv4(),
      invitation_id: invitationId,
      name: g.name.trim(),
      phone_number: g.phone_number?.trim() || "",
      is_sent: false,
    }));

    const { data, error } = await supabase
      .from("guests")
      .insert(payload)
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to add guests" });
  }
});

// Update guest status (e.g., mark as sent)
router.put("/:invitationId/:guestId", requireAuth, async (req: Request, res: Response) => {
  try {
    const { is_sent } = req.body;
    const { data, error } = await supabase
      .from("guests")
      .update({ is_sent })
      .eq("id", req.params.guestId)
      .eq("invitation_id", req.params.invitationId)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to update guest" });
  }
});

// Delete specific guest
router.delete("/:invitationId/:guestId", requireAuth, async (req: Request, res: Response) => {
  try {
    const { error } = await supabase
      .from("guests")
      .delete()
      .eq("id", req.params.guestId)
      .eq("invitation_id", req.params.invitationId);

    if (error) throw error;
    res.json({ message: "Guest deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to delete guest" });
  }
});

export default router;
