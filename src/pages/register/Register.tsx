import { useRef, type FormEvent } from "react";
import styles from "./Register.module.scss";
import { useNavigate } from "react-router";

const venues: string[] = ["mumbai", "bangalore", "chennai", "online"];
const formInputPattern: Record<string, RegExp> = {
    "bandName": /^.+$/,
    "venue": RegExp(`^${venues.join("|")}$`),
    "contactName1": /^[a-z 0-9]+$/,
    "contactPhone1": /^\d{10}$/,
    "contactName2": /^[a-z 0-9]+$/,
    "contactPhone2": /^\d{10}$/,
    "contactName3": /^([a-z 0-9]+)?$/,
    "contactPhone3": /^(\d{10})?$/,
}

export default function Register() {
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const formData = Object.fromEntries(new FormData(formRef.current as HTMLFormElement).entries());
        console.log(formData);

        if (!Object.keys(formData).every((key) => {
                const isValid = formInputPattern[key].test(formData[key] as string);
                console.log(key, isValid, formInputPattern[key], formData[key]);
                return isValid;
            })) return;
    }

    return (
        <div className={styles.registerPage}>
            <form className={styles.registerForm} ref={formRef}>
                <div className={styles.bandInfo}>
                    <h2 className={styles.infoTitle}>Band Info</h2>
                    <div className={styles.bandNameContainer}>
                        <input name="bandName" type="text" placeholder="Band Name" className={styles.bandNameInput} />
                        <span />
                        <span />
                        <span />
                        <span />
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
                                <input type="text" name="contactName1" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="contactPhone1" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className={styles.contactContainer}>
                            <label className={styles.contactLabel}>Contact 2:</label>
                            <div className={styles.contactInputContainer}>
                                <input type="text" name="contactName2" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="contactPhone2" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className={styles.contactContainer}>
                            <label className={styles.contactLabel}>Contact 3 (if any):</label>
                            <div className={styles.contactInputContainer}>
                                <input type="text" name="contactName3" placeholder="Name of the contact" className={styles.contactNameInput} id="contact-1-name" />
                                <input type="tel" name="contactPhone3" placeholder="Phone number" className={styles.contactPhoneInput} id="contact-1-phone" />
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