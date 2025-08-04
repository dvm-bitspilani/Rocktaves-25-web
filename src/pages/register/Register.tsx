import { useContext, useRef, type FormEvent } from "react";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { AppContext } from "../../App";

const venues: string[] = ["mumbai", "bangalore", "chennai", "online"];
const formInputPattern: Record<string, RegExp> = {
    "name": /^.+$/,
    "number_of_members": /^\d+$/,
    "venue": RegExp(`^${venues.join("|")}$`),
    "name1": /^[a-z 0-9]+$/,
    "phone1": /^\d{10}$/,
    "name2": /^[a-z 0-9]+$/,
    "phone2": /^\d{10}$/,
    "name3": /^([a-z 0-9]+)?$/,
    "phone3": /^(\d{10})?$/,
}

export default function Register() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const { appStates } = useContext(AppContext);
    const addNotif = appStates?.addNotif

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const postLink = `https://prereg.bits-oasis.org/RoctavesOnlineReg/`;
        const formData = Object.fromEntries(new FormData(formRef.current as HTMLFormElement).entries());

        if (!Object.keys(formData).every((key) => {
                const isValid = formInputPattern[key].test(formData[key] as string);
                // console.log(key, isValid, formInputPattern[key], formData[key], formData, addNotif);
                if (addNotif) {
                    if (key === "venue") addNotif(`Please check at least one venue to contest in.`)
                    else if (key === "name") addNotif(`Please fill the band name.`)
                    else if (key === "number_of_members") addNotif(`Please fill the number of band members in your band.`)
                    else if (key.includes("name")) addNotif("Please fill the contact names in the correct format: They can only contain alphabets, numbers or whitespace. Also the required contact fields cannot be blank.")
                    else if (key.includes("phone")) addNotif("Please fill the contact phone number in the correct format: They must be of 10 digits only. Also the required contact fields cannot be blank.")
                }
                return isValid;
            })) return;

        axios.post(postLink, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    // useEffect(() => {setIsLoading(false)}, [])

    return (
        <div className={styles.registerPage}>
            <form className={styles.registerForm} ref={formRef}>
                <div className={styles.bandInfo}>
                    <h2 className={styles.infoTitle}>Band Info</h2>
                    <div className={styles.bandNameContainer}>
                        <input name="name" type="text" placeholder="Band Name" className={styles.bandNameInput} />
                        <span />
                        <span />
                        <span />
                        <span />
                    </div>
                    <div className={styles.bandMemNumWrapper}>
                        <label htmlFor="memNum">Number of band members: </label>
                        <input type="number" id="memNum" name="number_of_members" placeholder="0"></input>
                    </div>
                    <div className={styles.venueContainer}>
                        <h3 className={styles.venueTitle}>Venue you can contest in:</h3>
                        <div className={styles.venueSelectContainer}>
                            {
                                venues.map((venue, i) => 
                                    <div className={styles.venueSelectWrapper} key={i}>
                                        <input type="radio" name="venue" value={venue} id={venue} className={styles.venueRadio} />
                                        <label htmlFor={venue} className={styles.venueLabel}>
                                            {venue}
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </label>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.contactInfo}>
                    <h2 className={styles.infoTitle}>Contact Info</h2>
                    <div className={styles.contactListContainer}>
                        <div className={styles.contactContainer}>
                            <label className={styles.contactLabel}>Contact 1:</label>
                            <div className={styles.contactInputContainer}>
                                <input type="text" name="name1" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="phone1" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className={styles.contactContainer}>
                            <label className={styles.contactLabel}>Contact 2:</label>
                            <div className={styles.contactInputContainer}>
                                <input type="text" name="name2" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="phone2" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className={styles.contactContainer}>
                            <label className={styles.contactLabel}>Contact 3 (if any):</label>
                            <div className={styles.contactInputContainer}>
                                <input type="text" name="name3" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="phone3" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <div className={styles.actionButtonContainer}>
                        <button className={styles.backButton} onClick={() => navigate("/")} >Back</button>
                        <button className={styles.registerButton} onClick={handleFormSubmit}>Register</button>
                    </div>
                </div>
            </form>
        </div>
    )
}