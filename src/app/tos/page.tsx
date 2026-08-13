import { FaGithub, FaDiscord } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | AcadVault2.0",
    description: "A living open-source repository of Academic Resources for DA-IICT",
};

const TermsOfService = () => (
    <div className="left-0 top-0 -z-10 h-full w-full md:w-3/4 xl:w-2/3 2xl:1/2 mx-auto">
        <div className="h-full text-center ">
            <h1 className="text-4xl font-bold mt-10 mb-5">Terms of Service</h1>
        </div>
        <div className="p-5">
            <p className="text-lg mb-3 mt-8 ">Please read these Terms of Service (&quot;Terms&quot;) carefully before using our website and services provided by{' '}<a className="text-blue-500" href="https://acadvault.vercel.app">AcadVault2.0{' '}</a> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website, you agree to be bound by these Terms.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Acceptance of Terms</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">1.1 Agreement:</h3>
            <p className="my-2">By accessing or using our website, you agree to these Terms and any additional terms and conditions that may apply to specific services offered on our website.</p>
            <h3 className="text-xl font-bold my-2">1.2 Eligibility:</h3>
            <p className="my-2">You must be a student of DA-IICT and have a student email account issued by DA-IICT. By using our website, you represent and warrant that you have the legal capacity to enter into these Terms.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">User Responsibilities</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">2.1 User Conduct:</h3>
            <p className="my-2">You agree to use our website and services in compliance with applicable laws and regulations. You further agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc px-5 md:px-10">
                <li className="my-2">Violating any intellectual property rights or other proprietary rights of any party.</li>
                <li className="my-2">Interfering with or disrupting the operation of our website or services.</li>
                <li className="my-2">Attempting to gain unauthorized access to our website or services, or to other accounts or networks connected to our website.</li>
                <li className="my-2">Engaging in any form of automated data collection or scraping without our prior written consent.</li>
            </ul>
            <h3 className="text-xl font-bold my-2">2.3 Content Ownership:</h3>
            <p className="my-2">You do not retain ownership of the materials you submit for review, but by submitting them to our website, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, distribute, and display your articles for the purpose of reviewing, editing, and publishing them on our website.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Intellectual Property</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">3.1 Website Content:</h3>
            <p className="my-2">All content on our website, including text, graphics, logos, images, and software, is the property of AcadVault2.0 or its licensors and is protected by intellectual property laws.</p>
            <h3 className="text-xl font-bold my-2">3.2 Trademarks:</h3>
            <p className="my-2">AcadVault2.0 and our logo are trademarks owned by us. You may not use our trademarks without our prior written permission.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Limitation of Liability</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">4.1 Disclaimer:</h3>
            <p className="my-2">Our website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not make any warranties, whether expressed or implied, regarding the reliability, accuracy, or availability of our website or services.</p>
            <h3 className="text-xl font-bold my-2">4.2 Limitation of Liability:</h3>
            <p className="my-2">To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, consequential, or punitive damages, or any loss of profits or revenue, arising out of or in connection with your use of our website or services.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Modifications to the Terms</h2>
            <hr className="opacity-70 mb-3" />
            <p className="my-2">We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be effective immediately upon posting the revised Terms on our website. Your continued use of our website after the posting of the revised Terms constitutes your acceptance of the changes.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Termination</h2>
            <hr className="opacity-70 mb-3" />
            <p className="my-2">We may suspend or terminate your access to our website and services at any time, without prior notice or liability, for any reason whatsoever, including if we believe that you have violated these Terms or applicable laws.</p>
        </div>
        <footer className="bottom-0 left-0 w-full bg-transparent text-sm p-5 border-t border-gray-300">
            <div className="flex justify-between">
                <p>&copy; {new Date().getFullYear()} | AcadVault2.0</p>
                <div className="flex">
                    <a href="https://github.com/AcadVault/AcadVault2.0" target="_blank" rel="noopener noreferrer" className="me-2"><FaGithub size={24} /></a>
                    <a href="https://discord.gg/mbAJsEnXgr" target="_blank" rel="noopener noreferrer" className="me-2"><FaDiscord size={24} /></a>
                </div>
            </div>
        </footer>
    </div>
);

export default TermsOfService;
