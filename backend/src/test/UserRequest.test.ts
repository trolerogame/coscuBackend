import supertest from "supertest";
import {app,server} from "../index";
import User from "../model/User"
const api = supertest(app)




describe("peticiones al ruta user ",()=> {
    const init = [
        {
            "username": "test",
            "email": "test@test.com",
            "password": "test"
        }
    ]
    beforeEach(async() => {
        await User.deleteMany({})
        await User.create(init[0] )
    })

    it("get users",async()=> {
        const {body} = await api.get("/users").expect(200)
        expect(body).toHaveLength(init.length)
    })

    it("createUser",async()=> {
        await api.post("/users/register").send({
            "username": "dani",
            "email":"dklj@gmail.com",
            "password": "caca"
        }).expect(200)
    })

    it("login user",async()=> {
        await api.post("/users/register").send({
            "username": "dani",
            "email":"dklj@gmail.com",
            "password": "caca"
        }).expect(200)  //? creamos el user
        await api.post("/users/login").send({
            "username": "dani",
            "password": "caca"
        }).expect(200)      //? logeamos el user
    })

    it("password incorrect",async()=> {
        const {text} = await api.post("/users/login").send({
            "username": "test",
            "password": "tes"
        }).expect(402)  //? la contrasenia es incorrecta
        expect(text).toBe("la contrasenia no coincide")
    })
})

afterAll(() => server.close())