import { FaGithub, FaDiscord } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | AcadVault2.0",
    description: "A living open-source repository of Academic Resources for DA-IICT",
};

const Privacy = () => (
    <div className="left-0 top-0 -z-10 h-full w-full md:w-3/4 xl:w-2/3 2xl:1/2 mx-auto">
        <div className="h-full text-center ">
            <h1 className="text-4xl font-bold mt-10 mb-5">Privacy Policy</h1>
        </div>
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Information We Collect</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">1.1 Personal Information:</h3>
            <ul className="list-disc px-5 md:px-10">
                <li className="my-2">When you create an account on our website, we collect your email address and name. This information is used to show on your profile page.</li>
                <li className="my-2">When you upload a material on our website, we collect your email address. This information is used for authentication purposes and to communicate with you regarding your submitted material.</li>
            </ul>
            <h3 className="text-xl font-bold my-2">1.2 Material Information:</h3>
            <p className="my-2">When you upload a material for request, we collect the content of the material, along with any additional information you provide. This information is used for approving, rejecting, and publishing purposes.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Use of Personal Information</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">2.1 Review and Approvation:</h3>
            <p className="my-2">We collect and use your personal information to review the material submitted by you and determine whether they meet our guidelines for publication. If approved, your material will be published globally on our website.</p>
            <h3 className="text-xl font-bold my-2">2.2 Communication:</h3>
            <p className="my-2">We may use your name and email address to communicate with you regarding your material submissions, updates, and notifications related to our services.</p>
            <h3 className="text-xl font-bold my-2">2.3 Aggregate Data:</h3>
            <p className="my-2">We may anonymize and aggregate the data collected from users to analyze trends, improve our services, and generate statistical information. This aggregated data will not contain any personally identifiable information.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Disclosure of Personal Information</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">3.1 Admin Reviewers:</h3>
            <p className="my-2"> Your submitted materials and associated personal information will be accessible to our authorized administrators and reviewers who are involved in the material review process.</p>
            <h3 className="text-xl font-bold my-2">3.2 Legal Compliance:</h3>
            <p className="my-2">We may disclose your personal information if required by law, regulation, or legal process, or to protect our rights, property, or the safety of others.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Data Security</h2>
            <hr className="opacity-70 mb-3" />
            <p className="my-2">We take reasonable measures to protect the personal information submitted to us against unauthorized access, loss, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Your Rights</h2>
            <hr className="opacity-70 mb-3" />
            <h3 className="text-xl font-bold my-2">5.1 Updating Information:</h3>
            <p className="my-2">You do not have the right to access and update your personal information provided to us. Once you submit a material, your id will be stored.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Third-Party Links</h2>
            <hr className="opacity-70 mb-3" />
            <p className="my-2">Our website may contain links to third-party websites or services that are not operated by us. We are not responsible for the privacy practices or the content of such third-party websites. We encourage you to review the privacy policies of those third parties before providing any personal information.</p>
            <h2 className="text-2xl font-bold mb-3 mt-8 text-center">Changes to this Privacy Policy</h2>
            <hr className="opacity-70 mb-3" />
            <p className="my-2">We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised policy on our website. We encourage you to review this Privacy Policy periodically.</p>
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

export default Privacy;
