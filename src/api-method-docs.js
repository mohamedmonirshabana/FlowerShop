/**
 * @swagger
 * path:
 *  /hello:
 *    get:
 *      summary: Get greeting message from TheCodebuzz
 *      responses:
 *        "200":
 *          description: GET reponse from API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */
app.get("/hello", (req, res) => {
    res.json("Hello world!");
  });