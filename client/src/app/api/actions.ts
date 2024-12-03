import { z } from "zod";

const ContactSchema = z.object({
    fullName: z.string().min(3, { message: "Be at least 3 characters long" }).trim(),
    phone: z.string().min(10, { message: "Be at least 10 characters long" }).trim(),
    email: z.string().email({ message: "Invalid email" }).trim(),
    subject: z.string().min(5, { message: "Be at least 5 characters long" }).trim(),
    address: z.string().min(10, { message: "Be at least 10 characters long" }).trim(),
    zipCode: z.string().min(5, { message: "Be at least 5 characters long" }).trim(),
    date: z.date(),
    time: z.date(),
});

export type ContactActionState = {
    fullName: string;
    phone: string;
    email: string;
    subject: string;
    address: string;
    zipCode: string;
    date: Date;
    time: Date;
    success: string | null;
    error: string | null;
};

export async function Contact(
    _prevState: ContactActionState,
    form: FormData
): Promise<ContactActionState> {
    const fullName = form.get("fullName") as string;
    const phone = form.get("phone") as string;
    const email = form.get("email") as string;
    const subject = form.get("subject") as string;
    const address = form.get("address") as string;
    const zipCode = form.get("zipCode") as string;
    const date = form.get("date") as string;
    const time = form.get("time") as string;

    const validatedFields = ContactSchema.safeParse({
        fullName,
        phone,
        email,
        subject,
        address,
        zipCode,
        date: date ? new Date(date) : undefined,
        time: time ? new Date(time) : undefined
    });

    if (!validatedFields.success) {
        throw new Error(JSON.stringify(validatedFields.error.flatten().fieldErrors));
    }
    const formData = {
        fullName,
        phone,
        email,
        subject,
        address,
        zipCode,
        date: date ? new Date(date) : undefined,
        time: time ? new Date(time) : undefined
    };

    try {
        await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        return {
            ...validatedFields.data,
            success: "Email sent successfully!",
            error: null,
        };
    } catch (error) {
        console.error("Email sending failed:", error);
        return {
            ...validatedFields.data,
            success: null,
            error: "Failed to send the email. Please try again later.",
        };
    }
}
