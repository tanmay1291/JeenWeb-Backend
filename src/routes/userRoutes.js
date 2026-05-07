import { registerUser, loginUser } from "../controllers/userController.js";

const userRoutes = (req, res) => {

    if (req.url === "/api/register" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                req.body = JSON.parse(body);
                registerUser(req, res);
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
        });
    }

    else if (req.url === "/api/login" && req.method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                req.body = JSON.parse(body);
                loginUser(req, res);
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ success: false, message: "Invalid JSON" }));
            }
        });
    }

};

export default userRoutes;