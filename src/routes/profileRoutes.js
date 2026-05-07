import { createProfile, getUserProfiles } from "../controllers/profileController.js";

const profileRoutes = (req, res) => {

    if (req.url === "/api/profile" && req.method === "POST") {

        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                req.body = JSON.parse(body);
                createProfile(req, res);
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
        });
    }


    else if (req.url.startsWith("/api/profile/") && req.method === "GET") {

        const userId = req.url.split("/")[3]; 
        req.params = { userId };

        getUserProfiles(req, res);
    }
};

export default profileRoutes;