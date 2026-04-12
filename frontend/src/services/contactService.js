import api from "./api";

export const contactService = {
    // Send contact form message
    sendMessage: (data) =>
        api.post("/contact", data),
};