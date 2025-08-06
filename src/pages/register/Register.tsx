import { useContext, useEffect, useRef, type FormEvent, type HTMLInputTypeAttribute } from "react";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { AppContext } from "../../App";

const venues: string[] = ["mumbai", "bangalore", "chennai", "delhi", "kolkata", "online"];
const formInputPattern: Record<string, RegExp> = {
    "name": /^.+$/,
    "email_address": /^[a-z0-9\._\-\+]+@[a-z0-9\-\.]+$/,
    "number_of_members": /^\d+$/,
    "venue": RegExp(`^${venues.join("|")}$`),
    "name1": /^[a-z 0-9]+$/,
    "phone": /^\d{10}$/,
    "name2": /^[a-z 0-9]+$/,
    "phone2": /^\d{10}$/,
    "name3": /^([a-z 0-9]+)?$/,
    "phone3": /^(\d{10})?$/,
    "city": /^.+$/,
    "music_since": /^\d{4}$/
}

const BandInfoInputField = ({name, placeholder, type}: {name: string, placeholder: string, type: HTMLInputTypeAttribute}) => {
    return (
        <div className={styles.bandInfoInputWrapper}>
            <input name={name} type={type} placeholder={placeholder} />
            {Array(8).fill(null).map((_, i) => <span key={i} />)}
        </div>
    )
}

export default function Register({setIsLoading}: {setIsLoading: React.Dispatch<React.SetStateAction<boolean>>}) {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
    const { appStates } = useContext(AppContext);
    const addNotif = appStates?.addNotif

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const baseLink = `https://prereg.bits-oasis.org/`;
        const formData = Object.fromEntries(new FormData(formRef.current as HTMLFormElement).entries());

        if (!Object.keys(formData).every((key) => {
                const isValid = formInputPattern[key].test((formData[key] as string).toLowerCase());
                if (!isValid && addNotif) {
                    if (key === "name" || key == "city") addNotif(`Please fill the band ${key}.`)
                    else if (key === "number_of_members") addNotif(`Please fill the number of band members in your band.`)
                    else if (key.includes("name")) addNotif("Please fill the contact names in the correct format: They can only contain alphabets, numbers or whitespace. Also the required contact fields cannot be blank.")
                    else if (key.includes("phone")) addNotif("Please fill the contact phone number in the correct format: They must be of 10 digits only. Also the required contact fields cannot be blank.")
                    else if (key === "email_address") addNotif("Please fill the email in the correct format.")
                    else if (key === "music_since") addNotif("Please fill the year of inception of the band correctly in YYYY format.")
                }
                return isValid;
            })) {
            return;
        }

        if (addNotif && !formData.name3 !== !formData.phone3) {
            addNotif("Please fill either both Name and Phone of Contact 3 or none of them.")
            return
        }
        
        if (addNotif && !formData.venue) {
            addNotif(`Please check a venue to contest in.`)
            return
        }
    
        if (addNotif && venues.filter((ven) => ven !== "online").includes(formData["city"] as string) && formData["city"] !== formData["venue"]) {
            addNotif("Bands are only allowed to contest from cities from where they're based in if offline rounds are being held there.") 
            return;
        }

        axios.post(`${baseLink}/$${formData.venue === "online" ? "/RoctavesOnlineReg/" : "/RoctavesOfflineReg/"}`, 
            formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (addNotif) {
                if (response.data.status === "1") addNotif("You've been successfully registered for Rocktaves 2025.")
                else addNotif(`Please fill the details correctly: ${response.data.message}`)
            }
                console.log(response)
        }).catch(() => {
            if (addNotif) addNotif("Something went wrong, your registration could not be completed.")
        })
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        event.stopPropagation()
    }

    useEffect(() => {setIsLoading(true)}, [])

    return (
        <div className={styles.registerPage}>
            <form className={styles.registerForm} ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.bandInfo}>
                    <h2 className={styles.infoTitle}>Band Info</h2>
                    <BandInfoInputField name="name" placeholder="Band Name" type="text" />
                    <BandInfoInputField name="email_address" placeholder="Your Email" type="email" />
                    <BandInfoInputField name="number_of_members" placeholder="Number of Band Members" type="number" />
                    <BandInfoInputField name="music_since" placeholder="Year of Inception of Band" type="number" />
                    <BandInfoInputField name="city" placeholder="City you're based in" type="text" />
                    {/* <div className={styles.bandMemNumWrapper}>
                        <label htmlFor="memNum">Number of band members: </label>
                        <input type="number" id="memNum" name="number_of_members" placeholder="0"></input>
                    </div> */}
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
                                <input type="tel" name="phone" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
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