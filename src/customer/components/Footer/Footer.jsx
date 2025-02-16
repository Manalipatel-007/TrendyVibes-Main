import { Link, Grid, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
    return (
        <div>
            <Grid className="bg-black text-white text-center mt-10"
                container
                sx={{ bgColor: "black", color: "white", py: 3 }}
            >
                {/* // one */}
                <Grid item xs={12} sm={6} md={3}>

                    <Typography className="pb-5" variant="h6">Company</Typography>
                    <div>
                        <button className="pb-5" variant="h6" >About</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Blog</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Press</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Jobs</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Partners</button>
                    </div>

                </Grid>
                {/* // Two  */}
                <Grid item xs={12} sm={6} md={3}>

                    <Typography className="pb-5" variant="h6">Solutions</Typography>
                    <div>
                        <button className="pb-5" variant="h6" >Marketing</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Analytics</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Commerce</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Insights</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Support</button>
                    </div>

                </Grid>
                {/* //Three  */}
                <Grid item xs={12} sm={6} md={3}>

                    <Typography className="pb-5" variant="h6">Documentation</Typography>
                    <div>
                        <button className="pb-5" variant="h6" >Guides</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >API STATUS</button>
                    </div>


                </Grid>
                {/* //Four  */}
                <Grid item xs={12} sm={6} md={3}>

                    <Typography className="pb-5" variant="h6">Legal</Typography>
                    <div>
                        <button className="pb-5" variant="h6" >Claim</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Privacy</button>
                    </div>

                    <div>
                        <button className="pb-5" variant="h6" >Terms</button>
                    </div>


                </Grid>
                <Grid container className="pt-20" justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <Typography variant="body2" component="p" align="center">
                            &copy; 2024 My Company. ALL rights reserved.
                        </Typography>
                        <Typography variant="body2" component="p" align="center">
                            Made with love by Me.
                        </Typography>
                        <Typography variant="body2" component="p" align="center">
                            Icons made by{' '}
                            <Link href="https://www.freepik.com/" color="inherit" underline="always">
                                Freepik
                            </Link>{' '}
                            from{' '}
                            <Link href="https://www.freepik.com/" color="inherit" underline="always">www.flaticom.com</Link>
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default Footer;