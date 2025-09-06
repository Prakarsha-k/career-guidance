const express = require("express");
const path = require("path")
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");
const user_auth = require("./middleware/user_auth.js");
const admin_auth = require("./middleware/admin_auth")
const app = express();

dotenv.config()

const port = process.env.PORT || 3000;
app.set('view engine', 'hbs')


require("./db/conn")
const User = require("./models/sign_up")
const Admin = require("./models/admin_sign_in")
const Course = require("./models/courses")
const Report = require("./models/reports.js")



app.use(CookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  // --> To display data



//  Static path
const s_path = path.join(__dirname, '../public')
app.use(express.static(s_path))


var signed_in = false;
var admin_signed_in = false;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var everything = {

    //   ------------     JS    -------------

    chj: "chart.min.js",
    eaj: "easing.min.js",
    waj: "waypoints.min.js",
    owj: "owl.carousel.min.js",
    moj: "moment.min.js",
    mtj: "moment-timezone.min.js",
    tej: "tempusdominus-bootstrap-4.min.js",

    maj: "main.js",


    //   ------------     CSS    ------------

    err: "error.css",

    bmc: "bootstrap.min.css",
    omc: "owl.carousel.min.css",
    stc: "style.css",
    tmc: "tempusdominus-bootstrap-4.min.css",
    str: "star_rating.css",


    //   ------------    ADMIN    ------------

    name: "S_Admin Name",
    desig: "Sub Admin",
    image: "user_logo.png"
}



function verify(path, result) {
    if (signed_in === true || admin_signed_in === true) {
        result.render(path, everything);
    }
    else {
        result.render('errors/err_not_signed', everything)
    }
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Code start for     BEFORE      Sign Up Pages

app.get("/", (req, res) => {
    res.render('b_index')
})

app.get("/b_about", (req, res) => {
    res.render('before/b_about')
})

app.get("/b_contact", (req, res) => {
    res.render('before/b_contact')
})

app.post("/b_contact", async (req, res) => {
    try {

        var name = req.body.name_r;
        var email = req.body.email_r;
        var report = req.body.subject_r;
        const Nreport = await new Report({
            name: name,
            email: email,
            subject: report
        });
        await Nreport.save();
        res.render("before/b_contact", { suc: "a", title: "Successfuly Submited" });

    } catch (error) {
        console.log(error.name);
        res.render("before/b_contact", { err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" });
    }
})

// ----------------------------->  END  <----------------------------------














// Code start for  ----------       AFTER     ------------   Sign Up Pages

app.get("/a_index", user_auth, (req, res) => {
    res.render('after/a_index');
})

app.get("/a_about", user_auth, (req, res) => {
    res.render('after/a_about');
})

app.get("/a_contact", user_auth, (req, res) => {
    res.render('after/a_contact')
})

app.get("/a_courses", user_auth, (req, res) => {
    res.render('after/a_courses')
})

app.post("/a_contact", user_auth, async (req, res) => {
    try {

        var name = req.body.name_r;
        var email = req.body.email_r;
        var report = req.body.subject_r;
        const Nreport = await new Report({
            name: name,
            email: email,
            subject: report
        });
        await Nreport.save();
        res.render("after/a_contact", { suc: "a", title: "Successfuly Submited" });

    } catch (error) {
        console.log(error.name);
        res.render("after/a_contact", { err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" });
    }
})


app.get("/visit_again", async (req, res) => {
    res.clearCookie("Career_Guidance");
    res.clearCookie("a_admin_token");
    res.render('visit_again', everything)
})

// --------------------------->  END  <------------------------------------------




// ------------------------------    COURSES  ------------------------


// D I P L O M A
app.get("/diploma", user_auth, (req, res) => {
    res.render('courses/diploma')
})

app.get("/diploma_cse", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "cse" }).sort({ rating: -1 })
    res.render('courses/diploma/cse', { data: course, everything: everything })
})

app.get("/diploma_ece", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "ece" }).sort({ rating: -1 })
    res.render('courses/diploma/ece', { data: course, everything: everything })
})

app.get("/diploma_eee", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "eee" }).sort({ rating: -1 })
    res.render('courses/diploma/eee', { data: course, everything: everything })
})

app.get("/diploma_civil", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "civil" }).sort({ rating: -1 })
    res.render('courses/diploma/civil', { data: course, everything: everything })
})

app.get("/diploma_mechanical", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "mechanical" }).sort({ rating: -1 })
    res.render('courses/diploma/mechanical', { data: course, everything: everything })
})

app.get("/diploma_automobile", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "automobile" }).sort({ rating: -1 })
    res.render('courses/diploma/automobile', { data: course, everything: everything })
})

app.get("/diploma_pharmacy", user_auth, async (req, res) => {
    let course = await Course.find({ course: "diploma", sub_course: "pharmacy" }).sort({ rating: -1 })
    res.render('courses/diploma/pharmacy', { data: course, everything: everything })
})





















// I N T E R M E D I A T E
app.get("/intermediate", user_auth, (req, res) => {
    res.render('courses/intermediate')
})

app.get("/inter_mpc", user_auth, async (req, res) => {
    let course = await Course.find({ course: "intermediate", sub_course: "mpc" }).sort({ rating: -1 })
    res.render('courses/intermediate/mpc', { data: course, everything: everything })
})

app.get("/inter_bipc", user_auth, async (req, res) => {
    let course = await Course.find({ course: "intermediate", sub_course: "bipc" }).sort({ rating: -1 })
    res.render('courses/intermediate/bipc', { data: course, everything: everything })
})

app.get("/inter_mec", user_auth, async (req, res) => {
    let course = await Course.find({ course: "intermediate", sub_course: "mec" }).sort({ rating: -1 })
    res.render('courses/intermediate/mec', { data: course, everything: everything })
})

app.get("/inter_hec", user_auth, async (req, res) => {
    let course = await Course.find({ course: "intermediate", sub_course: "hec" }).sort({ rating: -1 })
    res.render('courses/intermediate/hec', { data: course, everything: everything })
})

app.get("/inter_cec", user_auth, async (req, res) => {
    let course = await Course.find({ course: "intermediate", sub_course: "cec" }).sort({ rating: -1 })
    res.render('courses/intermediate/cec', { data: course, everything: everything })
})











// I T I
app.get("/iti", user_auth, (req, res) => {
    res.render('courses/iti')
})

app.get("/iti_copa", user_auth, async (req, res) => {
    let course = await Course.find({ course: "iti", sub_course: "copa" }).sort({ rating: -1 })
    res.render('courses/iti/copa', { data: course, everything: everything })
})


app.get("/iti_civil", user_auth, async (req, res) => {
    let course = await Course.find({ course: "iti", sub_course: "civil" }).sort({ rating: -1 })
    res.render('courses/iti/civil', { data: course, everything: everything })
})


app.get("/iti_electrician", user_auth, async (req, res) => {
    let course = await Course.find({ course: "iti", sub_course: "electrician" }).sort({ rating: -1 })
    res.render('courses/iti/electrician', { data: course, everything: everything })
})


app.get("/iti_electronics_mechanic", user_auth, async (req, res) => {
    let course = await Course.find({ course: "iti", sub_course: "electronics mechanic" }).sort({ rating: -1 })
    res.render('courses/iti/electronics_mechanic', { data: course, everything: everything })
})















// I I I T
app.get("/iiit", user_auth, (req, res) => {
    res.render('courses/iiit')
})













// T S R J C 
app.get("/tsrjc", user_auth, (req, res) => {
    res.render('courses/tsrjc')
})

app.get("/tsrjc_mpc", user_auth, async (req, res) => {
    let course = await Course.find({ course: "tsrjc", sub_course: "mpc" }).sort({ rating: -1 })
    res.render('courses/tsrjc/mpc', { data: course, everything: everything })
})


app.get("/tsrjc_bipc", user_auth, async (req, res) => {
    let course = await Course.find({ course: "tsrjc", sub_course: "bipc" }).sort({ rating: -1 })
    res.render('courses/tsrjc/bipc', { data: course, everything: everything })
})


app.get("/tsrjc_mec", user_auth, async (req, res) => {
    let course = await Course.find({ course: "tsrjc", sub_course: "mec" }).sort({ rating: -1 })
    res.render('courses/tsrjc/mec', { data: course, everything: everything })
})



// --------------------------->  END  <------------------------------------------











// ---------------------------> R E V I E W <-------------------------------------



app.post('/review', user_auth, async (req, res) => {
    try {

        const e_college = req.body.college;
        const ratings = parseInt(req.body.rating);
        const e_email = req.body.email;

        console.log(e_college, ratings, e_email);

        if (e_college == "Default" || ratings == 0) {
            res.render('after/a_courses', { err: "a", title: "Fill All Options", text: "Select the college and give a rating between 1 to 5" });
        }
        else {

            const user_review = await User.findOne({ email: e_email });

            if (user_review) {

                var later = 2;

                var find_r = "";

                for (i = 1; i < 6; i++) {

                    find_r = "rating" + i;

                    if (user_review[find_r] == e_college) {
                        console.log("found");
                        later = 0;
                        break;
                    }
                    else if (user_review[find_r] == "") {
                        console.log("not found");
                        later = 1;
                        break;
                    }
                }

                switch (later) {
                    case 0:

                        await User.findOneAndUpdate({ email: e_email }, { status: "blocked" })
                        res.render("after/a_courses", { err: "a", action: "err", title: "Account Blocked", text: "Your Account has been <b>Blocked</b> because of violating our rules<br>Anybody is not allowed to give rating to a same college twice" });

                        break;

                    case 1:

                        var obj = {};
                        obj[find_r] = e_college;
                        obj["reviews"] = (user_review.reviews - 1);
                        await User.findOneAndUpdate({ email: e_email }, obj);


                        var r = {}
                        const c = await Course.findOne({ college_name: e_college });
                        if (c.rating > 0) {
                            r["rating"] = Math.round(((c.rating + ratings) / 2));
                        }
                        else {
                            r["rating"] = ratings;
                        }
                        await Course.findOneAndUpdate({ college_name: e_college }, r)


                        res.render("after/a_courses", { suc: "a", title: "Rating Added", text: "Thanks for the <b>Rating</b> <br> You have " + (user_review.reviews - 1) + " left" });

                        break;

                    case 2:

                        res.render("after/a_courses", { err: "a", title: "No Reviews Left", text: "You have used up all your reviews so you cant review any more" });

                        break;


                }

            }
            else {
                res.render('after/a_courses', { err: "a", action: "err", title: "Err Email", text: "This Email Doesn't Exist" });
            }

        }
    }
    catch (error) {

        console.log(error);
        res.render("after/a_courses", { err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" })

    }
});





// --------------------------->  END  <------------------------------------------










// ----------------------------->  USER Sign UP <------------------------------------


app.get("/sign_up", (req, res) => {
    res.render('sign_up')
})


app.post("/sign_up", async (req, res) => {
    try {
        const password = req.body.password
        const c_password = req.body.c_password
        if (password === c_password) {
            const register_user = new User({
                f_name: req.body.f_name,
                l_name: req.body.l_name,
                gender: req.body.gender,
                email: req.body.email,
                password: password,
                c_password: c_password,
            })
            const u_registered = await register_user.save();
            res.render("sign_up", { suc: "a", title: "Successfuly created" })
        }
        else {
            res.render("sign_up", { err: "a", title: "Passwords Didn't Match", text: "Make Sure the <b>Passwords</b> match" })
        }

    } catch (error) {
        if (error.name === "MongoServerError") {
            res.render("sign_up", { err: "a", title: "Existing Email", text: "Make Sure the <b>Email</b> is yours because it seems that an <b>account already exists</b> with the email entered" })
        }
        else {
            res.render("sign_up", { err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" })
        }
        console.log(error.name);
    }
})


// -----------------------------> END <------------------------------------
















// ----------------------------->  USER Sign IN <------------------------------------


app.get("/user_sign_in", (req, res) => {
    res.render('user_sign_in')
})


app.post("/user_sign_in", async (req, res) => {
    try {
        const e_email = req.body.in_email;
        const e_password = req.body.in_password;

        const id = await User.findOne({ email: e_email })

        if (id.password === e_password) {
            if (id.status === "active") {

                signed_in = true;
                await User.findOneAndUpdate({ email: e_email }, { last_seen: Date.now() })
                const token = await id.generateAuthToken();
                await res.cookie("Career_Guidance", token, {
                    expires: new Date(Date.now() + 1200000),
                    httpOnly: true,
                    // secure: true
                })

                res.redirect("a_index")

            }
            else if (id.status === "blocked") {
                res.render("user_sign_in", { err: "a", action: "Contact", title: "Account Blocked", text: "Admin has <b>Blocked</b> your acoount for your respective <b>actions</b><br><br> Contact Us to get your <b>account</b> back" })
            }
            else if (id.status === "waiting") {

                const w_report = await new Report({
                    name: id.f_name,
                    email: id.email,
                    subject: "Activate this account he is trying to Sign in",
                    received_time: Date.now()
                });
                await w_report.save();

                res.render("user_sign_in", { err: "a", action: "Home", title: "Account Not Activated", text: "Sorry for the <b>inconvenience</b> your acoount has not been activated by the <b>admin</b> it will be activated soon" })
            }
        }
        else {
            res.render("user_sign_in", { err: "a", action: "Sign In", title: "Invalid Credentials", text: "Entered Login Details are <b>invalid</b>" })
        }

    } catch (error) {
        if (error.name === "TypeError") {
            res.render("user_sign_in", { err: "a", action: "Sign In", title: "Invalid Credentials", text: "Entered Login Details are <b>invalid</b>" })
        }
        else {
            console.log(error.name)
            res.render("user_sign_in", { err: "a", action: "Home", title: error.name, text: "Sorry for the <b>Inconvenience</b>" });
        }
    }

})



// -----------------------------> Sign IN END <------------------------------------














// -------------------------> Admin <--------------------

app.get("/admin_sign_in", (req, res) => {
    res.render('admin/admin_sign_in', { everything: everything })
})

app.get("/admin_members", admin_auth, (req, res) => {
    res.render('admin/admin_members', everything)
})

app.get("/admin_secret_code", admin_auth, (req, res) => {
    res.render('admin/admin_secret_code', everything)
})

app.get("/admin_sub_interface", admin_auth, (req, res) => {
    res.render('admin/admin_sub_interface', everything)
})

app.get("/admin_reports", admin_auth, async (req, res) => {
    let reports = await Report.find({});
    res.render('admin/admin_reports', { everything: everything, data: reports })
})

app.get("/admin_course_add", admin_auth, async (req, res) => {
    const c = await Course.find({});
    res.render('admin/admin_course_add', { everything: everything, data: c, w: "" })
})

app.get("/admin_course_remove", admin_auth, (req, res) => {
    res.render('admin/admin_course_remove', { everything: everything })
})

app.get("/admin_users_active", admin_auth, async (req, res) => {
    let active = await User.find({ status: "active" })
    res.render('admin/admin_users_active', { everything: everything, data: active })
})

app.get("/admin_users_blocked", admin_auth, async (req, res) => {
    let blocked = await User.find({ status: "blocked" })
    res.render('admin/admin_users_blocked', { everything: everything, data: blocked })
})

app.get("/admin_users_waiting", admin_auth, async (req, res) => {
    let waiting = await User.find({ status: "waiting" })
    res.render('admin/admin_users_waiting', { everything: everything, data: waiting })
})



// ------------------------>   END   <----------------




// ----------------------------->     ADMIN      Controls <------------------------------------


// Active all

app.post("/active_all", admin_auth, async (req, res) => {
    try {

        await User.updateMany({ status: "waiting" }, { status: "active" })
        res.redirect("admin_users_waiting")

    } catch (error) {
        console.log(error.name)
        res.redirect("admin_users_waiting")
    }
})

// Active


app.post("/active", admin_auth, async (req, res) => {
    try {

        let act_em = req.body.email;
        let temp = await User.findOne({ email: act_em })
        if (temp.email === act_em) {
            await User.findOneAndUpdate({ email: act_em }, { status: "active" })
            res.redirect("admin_users_active")
        }

    } catch (error) {
        console.log(error)
        res.redirect("admin_users_waiting")
    }
})

// Block

app.post("/block", admin_auth, async (req, res) => {
    try {

        let act_em = req.body.email;
        let temp = await User.findOne({ email: act_em })
        if (temp.email === act_em) {
            await User.findOneAndUpdate({ email: act_em }, { status: "blocked" })
            res.redirect("admin_users_blocked")
        }

    } catch (error) {
        console.log(error)
        res.redirect("admin_users_waiting")
    }
})

// Delete

app.post("/delete", admin_auth, async (req, res) => {
    try {

        let act_em = req.body.email;
        let temp = await Report.findOneAndRemove({ email: act_em });
        console.log(temp);
        res.redirect("admin_reports");

    } catch (error) {
        console.log(error)
        res.redirect("admin_reports");
    }
})

// Delete All

app.post("/delete_all", admin_auth, async (req, res) => {
    try {

        let act_em = req.body.email;
        let temp = await Report.find({}).deleteMany();
        res.redirect("admin_reports");

    } catch (error) {
        console.log(error)
        res.redirect("admin_reports");
    }
})

// Add Course

app.post("/course_add", admin_auth, async (req, res) => {
    try {

        const a_course = req.body.course;
        const a_sub_course = req.body.sub_course;
        const a_college_name = req.body.college_name;
        const a_description = req.body.description;
        const a_college_link = req.body.college_link;
        const a_image_link = req.body.image_link;

        console.log(a_course, a_sub_course, a_college_name, a_description, a_college_link, a_image_link);

        if (a_course == "Default" || a_sub_course == "Default") {
            res.render("admin/admin_course_add", { everything: everything, err: "a", title: "Incomplete Form", text: "Fill all the <b>blanks</b>" });
        }
        else {
            const c_data = await Course.findOne({ course: a_course, sub_course: a_sub_course, college_name: a_college_name }).count();
            console.log(c_data);
            if (c_data == 0) {
                const add_c = await new Course({
                    course: a_course,
                    sub_course: a_sub_course,
                    college_name: a_college_name,
                    description: a_description,
                    image_url: a_image_link,
                    links: a_college_link
                });


                const token = req.cookies.a_admin_token;
                const a_verify = jwt.verify(token, process.env.SECRET_PROJECT);

                const add_rep = await new Report({
                    name: a_verify.name,
                    email: a_verify.email,
                    subject: "A college named " + a_college_name + " has been added in " + a_course + " course and " + a_sub_course + " sub course",
                    received_time: Date.now()
                });

                await add_c.save();
                await add_rep.save();
                res.render("admin/admin_course_add", { everything: everything, suc: "a", title: "College Added", text: "The college with this details has been successfuly <b>Added</b>" })

            }
            else {
                res.render("admin/admin_course_add", { everything: everything, err: "a", title: "Already Exist", text: "The college with this details already <b>Exist</b>" })
            }
        }


    } catch (error) {
        console.log(error.name)
        res.render("admin/admin_course_add", { everything: everything, err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" })

    }
});


app.post("/course_remove", admin_auth, async (req, res) => {
    try {

        const a_course = req.body.course;
        const a_sub_course = req.body.sub_course;
        const a_college_name = req.body.college_name;

        console.log(a_course, a_sub_course, a_college_name);

        if (a_course == "Default" || a_sub_course == "Default") {
            res.render("admin/admin_course_remove", { everything: everything, err: "a", title: "Incomplete Form", text: "Fill all the <b>blanks</b>" });
        }
        else {
            const c_data = await Course.findOne({ course: a_course, sub_course: a_sub_course, college_name: a_college_name }).count();
            console.log(c_data);
            if (c_data == 0) {
                res.render("admin/admin_course_remove", { everything: everything, err: "a", title: "Doesn't Exist", text: "The college with this details Doesn't <b>Exist</b>" })

            }
            else {
                const add_c = await Course.findOneAndRemove({ course: a_course, sub_course: a_sub_course, college_name: a_college_name });

                const token = req.cookies.a_admin_token;
                const a_verify = jwt.verify(token, process.env.SECRET_PROJECT);

                const add_rep = await new Report({
                    name: a_verify.name,
                    email: a_verify.email,
                    subject: "A college named " + a_college_name + " has been removed from " + a_course + " course and " + a_sub_course + " sub course",
                    received_time: Date.now()
                });
                await add_rep.save();
                res.render("admin/admin_course_remove", { everything: everything, suc: "a", title: "College Removed", text: "The college with this details has been successfuly <b>Removed</b>" })
            }
        }


    } catch (error) {
        console.log(error.name)
        res.render("admin/admin_course_remove", { everything: everything, err: "a", title: error.name, text: "Sorry for the <b>Inconvenience</b>" })

    }
});

// ------------------------------------->     END      <---------------------------------------






// ----------------------------->     ADMIN      Sign IN <------------------------------------




app.post("/admin_sign_in", async (req, res) => {
    try {

        const a_em = req.body.a_email;
        const a_pa = req.body.a_password;
        const admin_id = await (Admin.findOne({ email: a_em }))


        if (admin_id.password === a_pa) {
            const a_token = await admin_id.generateAuthToken();
            res.cookie("a_admin_token", a_token, {
                expires: new Date(Date.now() + 1200000),
                httpOnly: true,
                // secure: true
            })
            res.redirect('admin_members')
        }
        else {
            res.render("admin/admin_sign_in", { everything: everything, err: "a", title: "Invalid Credentials", text: "only <b>Admins</b> are <b>Allowed</b>" })
        }


    } catch (error) {
        console.log(error)
        res.render("admin/admin_sign_in", { everything: everything, err: "a", title: error.name, text: "only <b>Admins</b> are <b>Allowed</b>" })
    }
})



app.post("/admin_secret_code", admin_auth, async (req, res) => {
    try {

        const se_co = req.body.sec_cod;
        const S_Code = await (Admin.findOne({ secret_code: se_co }))



        if (S_Code.secret_code === se_co) {
            everything.name = S_Code.name;
            everything.desig = S_Code.designation;
            everything.image = S_Code.image;
            admin_signed_in = true;
            res.redirect('admin_sub_interface')
        }
        else {
            res.redirect("err_invalid_admin")
        }


    } catch (error) {
        console.log(error.name)
        res.redirect("err_invalid_admin")
    }
})

// -------------------------------------->   END   <-------------------------------------------









app.get("/err_email", (req, res) => {
    res.render('errors/err_email', { everything: everything, err: "s", title: "Account with entered credentials already Exists", text: "Visit <b>SignUp</b> page to register." })
})

app.get("/err_fill_blanks", (req, res) => {
    res.render('errors/err_fill_blanks', everything)
})

app.get("/err_invalid_admin", (req, res) => {
    res.render('errors/err_invalid_admin', everything)
})

app.get("/err_invalid", (req, res) => {
    res.render('errors/err_invalid', everything)
})

app.get("/err_pass_and_cp", (req, res) => {
    res.render('errors/err_pass_and_cp', everything)
})

app.get("/err_success", (req, res) => {
    res.render('errors/err_success', everything)
})



app.get("*", (req, res) => {
    res.render("errors/err_404", everything)
})


app.listen(port, () => {
    console.log('server is running at port :', port);
})

