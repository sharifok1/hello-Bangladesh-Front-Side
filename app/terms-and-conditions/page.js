"use client";

import Layout from "@/components/Layout";
import Link from "next/link";




export default function TermsAndConditionsPage() {
  return (
    <>
      <Layout sidebar={false}>
          <main className="container mx-auto p-6">
            <div className="grid md:grid-cols-2 gap-8 ">
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-gray-700">Terms and Conditions</h3>
                   <div className="terms-conditions max-w-4xl mx-auto p-6">
                        {/* Contact Info */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
                            <p className="text-blue-800 font-medium">
                            <strong>For any queries, please email:</strong> 
                            <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline ml-1">info@hellobd.news</Link>
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Acceptance of Terms */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News reserves the right to accept or reject any reader&apos;s objections or statements. All readers of Hello Bangladesh News must comply with these &ldquo;Terms of Use.&rdquo; Failure to do so or any violation of the terms may result in suspension of the user&apos;s account, restriction from accessing the website, or other actions. Accessing Hello Bangladesh News or using its application implies that the user agrees to these &ldquo;Terms of Use.&rdquo; These services include texts, images, graphics, audio, videos, software, etc.
                            </p>
                            </section>

                            {/* Intellectual Property Rights */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Intellectual Property Rights</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The content, logo, copyrights, trademarks, patents, texts, images, graphics, domain names, audio, video, and other intellectual property and branding elements related to Hello Bangladesh News belong to Hello Bangladesh News and its licensees. Users cannot claim any rights, whether commercial or non-commercial, over Hello Bangladesh News&apos; intellectual property. Additionally, users are not permitted to create new content using Hello Bangladesh News&apos; materials. Any violation of copyrights or intellectual property rights may result in legal action by Hello Bangladesh News. If you notice any discrepancies, please email: 
                                <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline ml-1">info@hellobd.news</Link>
                            </p>
                            </section>

                            {/* Usage of Services */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Usage of Services</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Readers and visitors must use the services of Hello Bangladesh News for lawful and reading purposes only. The audio-visual materials on the website and application are strictly for viewing and listening purposes. Hello Bangladesh News encourages users to share its content on social media, but the content must remain unaltered and be credited as Hello Bangladesh News content. Hacking the website is strictly prohibited. No content from Hello Bangladesh News may be used or sold for commercial purposes. Users cannot use provocative or offensive language or images in their comments directed at Hello Bangladesh News content.
                            </p>
                            </section>

                            {/* Content Removal */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Content Removal</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News reserves the right to remove any content from its website and application at any time.
                            </p>
                            </section>

                            {/* Prohibited and Unauthorized Use */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Prohibited and Unauthorized Use</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Users cannot associate Hello Bangladesh News with any political party, racism, communalism, or gender discrimination activities, nor can they tarnish the reputation of the organization. Defamation of Hello Bangladesh News or any individual, harassment, persecution, or contempt of court-related actions is prohibited. Users cannot upload unethical, offensive, or indecipherable comments or images, nor can they post content that personally attacks others.
                            </p>
                            </section>

                            {/* User Device Security */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">User Device Security</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Users are responsible for ensuring their own security. Hello Bangladesh News is not liable for any damage to users&apos; devices caused by viruses, malware, or similar harmful elements. If a third-party content affects a user&apos;s device, Hello Bangladesh News will not be held responsible. This may include Google advertisements, but it is not limited to them. Any content not created by Hello Bangladesh News but displayed on its website will be considered third-party content.
                            </p>
                            </section>

                            {/* Restrictions on Sharing Marks, Content, and Images */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Restrictions on Sharing Marks, Content, and Images</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Users are prohibited from sharing or promoting marks, content, and images for commercial or other purposes. However, if Hello Bangladesh News creates the content and grants permission, it can be shared with proper attribution. The rights to Hello Bangladesh News&apos; created content and images belong to Hello Bangladesh News, not the users.
                            </p>
                            </section>

                            {/* External Website Transfers */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">External Website Transfers</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News is not responsible if users are redirected from its website to another, including unwanted websites.
                            </p>
                            </section>

                            {/* Third-Party Content */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Third-Party Content</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News does not bear any responsibility for third-party content that it has not created.
                            </p>
                            </section>

                            {/* Privacy Policy */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The &ldquo;Privacy Policy&rdquo; is an integral part of these terms. Except for identical or similar conditions, all terms from the &ldquo;Privacy Policy&rdquo; are incorporated herein by reference.
                            </p>
                            </section>

                            {/* Advertisements */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Advertisements</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The advertisements displayed on Hello Bangladesh News&apos; website and mobile application belong to third parties. These advertisers may collect user information and share it with other parties. If any issues arise from this, Hello Bangladesh News is not responsible.
                            </p>
                            </section>

                            {/* Modifications */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Modifications</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News reserves the right to modify, update, enhance, or revise any of its policies at any time.
                            </p>
                            </section>

                            {/* Use of Cookies */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Use of Cookies</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News does not collect cookie-based statistics or store users&apos; personal information. However, third parties may collect users&apos; cookies upon visiting Hello Bangladesh News, which is beyond Hello Bangladesh News&apos; control. Users should be cautious when visiting third-party websites. If a user registers on Hello Bangladesh News, personal information may be collected to verify authenticity. However, Hello Bangladesh News does not share this information with third parties. Such data may be used to provide necessary information to users or for Hello Bangladesh News-related company updates.
                            </p>
                            </section>

                            {/* Communication with Hello Bangladesh News */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Communication with Hello Bangladesh News</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Hello Bangladesh News may contact users via email, phone, or SMS for various events, campaigns, contests, surveys, or feedback.
                            </p>
                            </section>

                            {/* User-Generated Content */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">User-Generated Content</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Users of Hello Bangladesh News may post comments, images, and videos. Users must ensure they are the original creators of such content or have permission to use it from the original creator. They must also ensure their content does not include obscenity, harassment, fraud, threats, offensive remarks, illegality, or privacy violations. Hello Bangladesh News does not endorse or verify the authenticity of user-generated content.
                            </p>
                            <p className="text-gray-700 font-medium mb-3">Users must agree to the following conditions while using Hello Bangladesh News:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>No content should be posted with the intent to harm or harass others.</li>
                                <li>No content should be posted that could result in unlawful actions, defamation, or discrimination based on race, religion, ethnicity, nationality, age, marital status, sexual orientation, military status, or disability.</li>
                                <li>No software or code should be posted or distributed that could disrupt or destroy Hello Bangladesh News&apos; website, hardware, or telecommunications equipment.</li>
                                <li>No content should be uploaded or promoted that encourages criminal activities or could result in civil or criminal liability.</li>
                            </ul>
                            </section>

                            {/* Accessing the Website from Outside Bangladesh */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Accessing the Website from Outside Bangladesh</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If readers provide personal information while accessing Hello Bangladesh News from outside Bangladesh, it will be processed according to the &ldquo;Terms of Use&rdquo; and &ldquo;Privacy Policy.&rdquo;
                            </p>
                            </section>

                            {/* Viewing and Posting Content */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Viewing and Posting Content</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Users view and post content on Hello Bangladesh News at their own discretion and risk. The accuracy of the content depends on the user&apos;s judgment and evaluation.
                            </p>
                            </section>

                            {/* Third-Party Liability */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Third-Party Liability</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Some of the information on Hello Bangladesh News is provided by third parties, which are beyond Hello Bangladesh News&apos; control. It is not possible for Hello Bangladesh News to verify the accuracy of such information. Users are advised to verify the authenticity of any third-party information before relying on it.
                            </p>
                            </section>

                            {/* Legal Jurisdiction */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Legal Jurisdiction</h2>
                            <p className="text-gray-700 leading-relaxed">
                                The &ldquo;Terms of Use&rdquo; and the relationship between Hello Bangladesh News and its users are governed by the existing laws of Bangladesh. Any disputes regarding data storage, disclosure, or publication will be resolved under the Arbitration Act, ২০০১. The arbitration will take place in Dhaka with a tribunal of three members, having full jurisdiction under the court. Regardless of nationality, residence, or place of business, these policies apply to all users accessing the website or application.
                            </p>
                            </section>

                            {/* Unsubscription */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Unsubscription</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If a reader no longer wishes to receive marketing emails, they can unsubscribe by clicking the &ldquo;Unsubscribe&rdquo; option in any email. If they want to delete their registered account, they can request it by emailing: 
                                <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline ml-1">info@hellobd.news</Link>
                            </p>
                            </section>

                            {/* Correction Policy */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Correction Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Despite taking all precautions, unintentional errors in Hello Bangladesh News&apos; publications may occur. If any errors are found, we are committed to correcting them and informing our readers accordingly. Readers may also report errors to us.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">1</span>
                                <span><strong>Error Notification</strong> – If an error is found, the concerned reporter and department head are notified for verification and correction.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">2</span>
                                <span><strong>Correction Updates</strong> – Corrections are applied to print, online, and social media platforms following Hello Bangladesh News&apos; policy.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">3</span>
                                <span><strong>Correction Note</strong> – A note under &ldquo;Correction&rdquo; is added to updated content, specifying the correction details, date, and time.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">4</span>
                                <span><strong>Factual Errors Only</strong> – Corrections are made only for factual errors; minor grammatical or spelling mistakes are not noted separately.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">5</span>
                                <span><strong>Article Removal Policy</strong> – Articles are generally not removed. In exceptional cases, if removal is necessary, the headline remains with a note explaining the reason.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">6</span>
                                <span><strong>Response Handling</strong> – If a published report receives a response, it is published along with the reporter&apos;s statement.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">7</span>
                                <span><strong>Legal Review</strong> – Any legal concerns are reviewed in consultation with legal advisors.</span>
                                </li>
                                <li className="flex items-start">
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-3 mt-0.5">8</span>
                                <span><strong>Breaking News & Social Media</strong> – Breaking news updates occur in real time without a correction notice. Errors in social media posts or graphics are corrected or removed based on significance, with an explanatory note.</span>
                                </li>
                            </ul>
                            </section>

                            {/* Comment Policy */}
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200">Comment Policy</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Comments must not violate the laws of Bangladesh.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Comments must not be offensive or disrespectful towards any individual, group, language, or religion.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Obscene or inappropriate words, phrases, or sentences are not allowed.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Comments must not contain personal attacks, threats, or intimidation.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Links are not allowed in comments.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Comments must be in proper Bengali script, not written in English letters.</span>
                                </li>
                                <li className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Comments with excessive spelling errors or incomplete sentences may not be published.</span>
                                </li>
                                <li className="flex items-start md:col-span-2">
                                <svg className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-700">Hello Bangladesh News reserves the right to remove any comment at its discretion.</span>
                                </li>
                            </ul>
                            </section>
                        </div>
                        </div>

              </div>

              <div className="md:col-span-1">
                <h3 className="text-xl font-bold text-gray-700">শর্তাবলি ও নীতিমালা</h3>       
                    <div className="terms-conditions max-w-4xl mx-auto p-6">
                    {/* Contact Info */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
                        <p className="text-blue-800 font-medium text-left">
                        <strong>এই ঠিকানায় ইমেইল পাঠিয়ে জানাতে অনুরোধ করছি:</strong> 
                        <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline mr-2">info@hellobd.news</Link>
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Acceptance of Terms */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">পাঠকের আপত্তি বা বক্তব্য গ্রহণ</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            পাঠকের আপত্তি বা বক্তব্য গ্রহণ করা বা না করার এখতিয়ার হ্যালোবিডি.নিউজ। হ্যালোবিডি.নিউজের সব পাঠককে এই 'ব্যবহারের শর্তাবলি' মেনে চলতে হবে। না মানলে বা ব্যবহারের শর্তাবলি-পরিপন্থী কোনো কিছু ঘটলে গ্রাহকের অ্যাকাউন্ট স্থগিত করা থেকে তাঁদের ওয়েবসাইটে প্রবেশ ইত্যাদি নানা কিছুর ওপর নিষেধাজ্ঞা প্রয়োগ করা হতে পারে। হ্যালোবিডি.নিউজের ওয়েবসাইটে প্রবেশ করা কিংবা অ্যাপ্লিকেশন ব্যবহার করার অর্থ, গ্রাহক বা দর্শনার্থীরা হ্যালোবিডি.নিউজের সেবা নিচ্ছেন এবং 'ব্যবহারের শর্তাবলি' মেনে নিতে সম্মতি দিচ্ছেন। এই সেবার মধ্যে আছে লেখা, ছবি, গ্রাফিকস, অডিও, ভিডিও, সফটওয়্যার ইত্যাদি।
                        </p>
                        </section>

                        {/* Intellectual Property Rights */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">মেধাসম্পদের অধিকার</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজর কনটেন্ট, লোগো, স্বত্ব, ট্রেডমার্ক, পেটেন্ট, লেখা, ছবি, গ্রাফিকস, ডোমেইন নেম, অডিও, ভিডিও এবং হ্যালোবিডি.নিউজের সঙ্গে সম্পর্কিত মেধাসম্পদ ও ব্র্যান্ডের অন্যান্য বৈশিষ্ট্য ও নাম হ্যালোবিডি.নিউজ এবং এর লাইসেন্সধারীর মালিকানাধীন। এর লাইসেন্সধারীর মেধাসম্পদে বাণিজ্যিক বা অবাণিজ্যিক কোনো উদ্দেশ্যেই ব্যবহারকারী কোনো অধিকার দাবি করতে পারবেন না। এ ছাড়া হ্যালোবিডি.নিউজের কনটেন্ট দিয়ে ব্যবহারকারী নতুন কিছু বানাতেও পারবেন না। স্বত্ব বা মেধাসম্পদ লঙ্ঘন করা হলে হ্যালোবিডি.নিউজ কর্তৃপক্ষ আইনানুগ ব্যবস্থা নিতে পারবে। কোন অসঙ্গতি চোখে পড়লে ইমেইল পাঠাতে পারেন: 
                            <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline mr-2">info@hellobd.news</Link>
                        </p>
                        </section>

                        {/* Usage of Services */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">আমাদের সেবা: আপনার ব্যবহার</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            পাঠক ও ভিজিটরদের শুধু আইনগতভাবে বৈধ কাজে কিংবা পাঠের লক্ষ্যে হ্যালোবিডি.নিউজ সাইটের সেবা নিতে হবে। ওয়েবসাইট ও অ্যাপ্লিকেশনের অডিও-ভিজ্যুয়াল উপাদান কেবলই দেখা ও শোনার জন্য, এর বাইরে আর কিছুর জন্য হ্যালোবিডি.নিউজ অনুমতি দেয় না। হ্যালোবিডি.নিউজ সামাজিক মাধ্যমে তার কনটেন্ট ভাগাভাগির জন্য পাঠকদের উদ্বুদ্ধ করে। তবে আমাদের কনটেন্ট সামাজিক বা ডিজিটাল মাধ্যমে অবশ্যই অবিকৃতভাবে এবং হ্যালোবিডি.নিউজের কনটেন্ট হিসেবে স্বীকৃতি দিয়ে পরিবেশন করতে হবে। আমাদের ওয়েবসাইট হ্যাক করা নিষিদ্ধ। বাণিজ্যিক উদ্দেশ্যে আমাদের কোনো কনটেন্ট ব্যবহার বা বিক্রি করা যাবে না। হ্যালোবিডি.নিউজের কনটেন্ট লক্ষ্য করে ব্যবহারকারীরা উসকানিমূলক বা আক্রমণাত্মক ভাষা ও ছবি ব্যবহার বা মন্তব্য করতে পারবেন না।
                        </p>
                        </section>

                        {/* Content Removal */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">কনটেন্ট সরিয়ে নেওয়া</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            ওয়েবসাইট ও অ্যাপ্লিকেশন থেকে হ্যালোবিডি.নিউজ নিজ ক্ষমতাবলে যেকোনো সময় যেকোনো কনটেন্ট সরিয়ে নিতে পারে।
                        </p>
                        </section>

                        {/* Prohibited and Unauthorized Use */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">নিষিদ্ধ ও অননুমোদিত ব্যবহার</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            পাঠক হ্যালোবিডি.নিউজকে কোনো রাজনৈতিক দল, বর্ণবাদ, সাম্প্রদায়িকতা বা কোনো লিঙ্গবৈষম্যবাদী তৎপরতার সঙ্গে যুক্ত করতে পারবেন না এবং প্রতিষ্ঠানের ভাবমূর্তি ক্ষুণ্ণ করতে পারবেন না। হ্যালোবিডি.নিউজ বা কোনো ব্যক্তির মানহানি, মানুষকে হেনস্তা ও নিপীড়ন, আদালতের কার্যক্রম নিয়ে আদালত অবমাননার পরিস্থিতি সৃষ্টি করার মতো আচরণ নিষিদ্ধ। অনৈতিক, আক্রমণাত্মক ও দুর্বোধ্য মন্তব্য বা ছবি আপলোড করা যাবে না। একইভাবে মন্তব্য বা ছবি পোস্ট করার মাধ্যমে ব্যক্তিগত আক্রমণও করা যাবে না।
                        </p>
                        </section>

                        {/* User Device Security */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">ব্যবহারকারীর ডিভাইসের সুরক্ষা</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            এ ক্ষেত্রে ব্যবহারকারীদের নিজের সুরক্ষা নিজেদের নিশ্চিত করতে হবে। ভাইরাস, ম্যালওয়্যার বা এ-জাতীয় ক্ষতিকর কোনো কিছুর আক্রমণে ডিভাইসের ক্ষতি হলে তার দায় হ্যালোবিডি.নিউজ নেবে না। তৃতীয় পক্ষের কনটেন্টে প্রবেশ করার কারণে ডিভাইসের ক্ষতি হলে হ্যালোবিডি.নিউজ সে জন্য দায়ী হবে না। এর মধ্যে গুগলের বিজ্ঞাপন থাকতে পারে, তবে ব্যাপারটা শুধু এটুকুর মধ্যেই সীমাবদ্ধ নয়। যে কনটেন্ট হ্যালোবিডি.নিউজ প্রকাশ করেনি, তা হ্যালোবিডি.নিউজের ওয়েবসাইটে প্রদর্শিত হলেও তৃতীয় পক্ষের কনটেন্ট হিসেবে বিবেচিত হবে।
                        </p>
                        </section>

                        {/* Restrictions on Sharing Marks, Content, and Images */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">মার্ক, কনটেন্ট ও ছবি আদান-প্রদানে নিষেধাজ্ঞা</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            বাণিজ্যিক বা যেকোনো কারণে পাঠকদের ছাপ বা মার্ক, কনটেন্ট ও ছবি ভাগাভাগি বা প্রচার করা নিষিদ্ধ। তবে কনটেন্ট হ্যালোবিডি.নিউজের সৃষ্ট হলে এবং অনুমোদন দেওয়া থাকলে কনটেন্ট, ছবি বা মার্ক ভাগাভাগি করার সময় সূত্র উল্লেখ করতে হবে। হ্যালোবিডি.নিউজের সৃষ্ট কনটেন্ট ও ছবির স্বত্ব পাঠকের নয়।
                        </p>
                        </section>

                        {/* External Website Transfers */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">অন্য ওয়েবসাইটে স্থানান্তর</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজের ওয়েবসাইট থেকে পাঠক অন্য কোনো ওয়েবসাইটে, এমনকি অনাকাক্সিক্ষত ওয়েবসাইটে স্থানান্তরিত হলেও তার দায় হ্যালোবিডি.নিউজের নয়।
                        </p>
                        </section>

                        {/* Third-Party Content */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">তৃতীয় পক্ষের কনটেন্ট</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            তৃতীয় পক্ষের কনটেন্ট, অর্থাৎ যে কনটেন্ট হ্যালোবিডি.নিউজ সৃষ্টি করেনি,হ্যালোবিডি.নিউজ কোনোভাবেই তার দায় বহন করবে না।
                        </p>
                        </section>

                        {/* Privacy Policy */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">গোপনীয়তা নীতি</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            'গোপনীয়তা নীতি' এই নীতিমালার অবিচ্ছেদ্য অংশ। যেসব শর্ত অভিন্ন বা সমরূপ, সেগুলো বাদে 'গোপনীয়তা নীতি'র সব শর্ত রেফারেন্স হিসেবে এতে গৃহীত হয়েছে।
                        </p>
                        </section>

                        {/* Advertisements */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">বিজ্ঞাপন</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজের ওয়েবসাইট ও মোবাইল অ্যাপে যেসব বিজ্ঞাপন পরিবেশিত হয়, সেগুলোর মালিকানা তৃতীয় পক্ষের। তবে তারা পাঠকদের তথ্য সংগ্রহ করতে পারে এবং অন্য পক্ষের সঙ্গে তা আদান-প্রদানও করতে পারে। এর ফলে কোনো সমস্যা উদ্ভূত হলে তার দায় হ্যালোবিডি.নিউজ নেবে না।
                        </p>
                        </section>

                        {/* Modifications */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">পরিবর্তন</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজ যেকোনো সময় তার যেকোনো নীতিমালায় সংশোধন, পরিবর্তন, পরিবর্ধন, পরিমার্জন আনার অধিকার রাখে।
                        </p>
                        </section>

                        {/* Use of Cookies */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">কুকির ব্যবহার</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            ব্যবহারকারীর কুকিভিত্তিক পরিসংখ্যান সংগ্রহ করে না। ব্যবহারকারীর ব্যক্তিগত তথ্যও হ্যালোবিডি.নিউজ সংরক্ষণ করে না। এমনও হতে পারে যে পাঠক বা দর্শনার্থীর হ্যালোবিডি.নিউজ ওয়েবসাইটে প্রবেশের মাধ্যমে তৃতীয় পক্ষ ব্যবহারকারীর কুকি সংগ্রহ করতে পারে, যার ওপর হ্যালোবিডি.নিউজের নিয়ন্ত্রণ নেই। সে জন্য পাঠকদের তৃতীয় পক্ষের ওয়েবসাইট সতর্কতার সঙ্গে দেখা উচিত। কোনো গ্রাহক হ্যালোবিডি.নিউজের নিবন্ধন করলে তার সত্যতা প্রতিপাদনের জন্য ব্যক্তিগত তথ্য সংগ্রহ করা হয়। তবে হ্যালোবিডি.নিউজ সে তথ্য তৃতীয় পক্ষের সঙ্গে আদান-প্রদান করে না। হ্যালোবিডি.নিউজের পাঠকদের প্রয়োজনীয় তথ্য জানাতে বা হ্যালোবিডি.নিউজ-সম্পর্কিত কোম্পানির তথ্য পাঠাতে এসব তথ্য ব্যবহার করা হতে পারে।
                        </p>
                        </section>

                        {/* Communication with Hello Bangladesh News */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">হ্যালোবিডি.নিউজের যোগাযোগ</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            সময়ে সময়ে ইমেইল, ফোন ও এসএমএসের মাধ্যমে যোগাযোগ করে বিভিন্ন অনুষ্ঠান, প্রচারণা, প্রতিযোগিতা, জরিপ ও প্রতিক্রিয়ার জন্য হ্যালোবিডি.নিউজ পাঠকদের সঙ্গে যোগাযোগ করতে পারে।
                        </p>
                        </section>

                        {/* User-Generated Content */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">ব্যবহারকারীদের কনটেন্ট</h2>
                        <p className="text-gray-700 leading-relaxed text-left mb-4">
                            হ্যালোবিডি.নিউজের পাঠকেরা সময়-সময় মন্তব্য, ছবি ও ভিডিওর মতো বিভিন্ন পোস্ট ও কনটেন্ট তুলতে পারেন। সে ক্ষেত্রে পাঠকদের নিশ্চিত করতে হবে যে তাঁরাই এসব কনটেন্টের স্রষ্টা কিংবা অন্য কেউ তার স্রষ্টা হলে ব্যবহারের অনুমতি তিনি দিয়েছেন। একই সঙ্গে পাঠককে এটাও নিশ্চিত করতে হবে যে তাঁর কনটেন্টে অশ্লীলতা, হয়রানি, প্রতারণা, হুমকি, আক্রমণাত্মক, অসম্মানজনক, অবৈধ বা কারও গোপনীয়তা লঙ্ঘন করার মতো উপাদান নেই। পাঠকদের কোনো কনটেন্ট হ্যালোবিডি.নিউজ অনুমোদন করে না বা তার সত্যতা নিশ্চিত করে না। এ ছাড়া হ্যালোবিডি.নিউজর ওয়েবসাইট ব্যবহার করার সময় পাঠকদের বেশ কিছু বিষয়ে সম্মত হতে হবে।
                        </p>
                        <ul className="space-y-3 text-left">
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">অন্যের ক্ষতি বা হানি করার জন্য উদ্দেশ্যমূলকভাবে পোস্ট দেওয়া যাবে না;</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">১</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">হ্যালোবিডি.নিউজের ওয়েবসাইটে এমন কিছু পোস্ট করা যাবে না, যাতে কেউ অন্যায়ের বা হয়রানির শিকার হয় বা কারও অবমাননা ঘটে কিংবা কোনো ব্যক্তি বা ব্যক্তিবর্গ জাতি-ধর্ম-বর্ণ-গোত্র-জাতিসত্তা-নাগরিকত্ব-বয়স-বৈবাহিক অবস্থা-যৌন অভ্যাস-সামরিক অবস্থা ও অসক্ষমতার কারণে নিপীড়নের শিকার হন;</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">২</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">এমন কোনো সফটওয়্যার বা কোড পোস্ট বা প্রচার করা যাবে না, যাতে হ্যালোবিডি.নিউজের ওয়েবসাইটের কার্যক্রম ব্যাহত বা ধ্বংস হতে পারে; হার্ডওয়্যার বা টেলিযোগাযোগ যন্ত্রের ক্ষেত্রেও একই কথা প্রযোজ্য;</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৩</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">এমন কোনো কনটেন্ট আপলোড বা প্রচার করা যাবে না বা হ্যালোবিডি.নিউজের ওয়েবসাইট-সংক্রান্ত ব্যবস্থা নেওয়া যাবে না, যাতে অপরাধমূলক কার্যক্রম উৎসাহিত হতে পারে বা দেওয়ানি অথবা ফৌজদারি দায় সৃষ্টি হতে পারে।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৪</span>
                            </li>
                        </ul>
                        </section>

                        {/* Accessing the Website from Outside Bangladesh */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">দেশের বাইরে থেকে ওয়েবসাইটে প্রবেশ</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            বাংলাদেশের বাইরে থেকে পাঠকেরা যেসব ব্যক্তিগত তথ্য দেবেন, তা 'ব্যবহারের শর্তাবলি' ও 'গোপনীয়তা নীতি' অনুযায়ী প্রক্রিয়া করা হবে।
                        </p>
                        </section>

                        {/* Viewing and Posting Content */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">কনটেন্ট দেখা ও পোস্ট করা</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            পাঠক ও দর্শনার্থীরা যখন হ্যালোবিডি.নিউজের ওয়েবসাইটে কনটেন্ট পোস্ট করেন বা অন্যদের দেওয়া কনটেন্ট দেখেন, তখন তাঁরা নিজেদের ঝুঁকি বা বিবেচনা মনে রেখেই সেটি করেন। কনটেন্টের বস্তুনিষ্ঠতার ওপর তাঁরা যে আশ্বাস বা বিশ্বাস স্থাপন করেন, তার ভিত্তি তাঁদের নিজেদের বিবেচনাবোধ।
                        </p>
                        </section>

                        {/* Third-Party Liability */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">তৃতীয় পক্ষের দায়</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজে যে তথ্য পরিবেশিত হয়, তার একটি অংশ তৃতীয় পক্ষের প্রদত্ত। তারা হ্যালোবিডি.নিউজের নিয়ন্ত্রণাধীন নয়। তাদের তথ্যের যথার্থতা নিশ্চিত করা সে কারণে হ্যালোবিডি.নিউজর পক্ষে সম্ভব নয়। তাই হ্যালোবিডি.নিউজ বা তৃতীয় পক্ষের পরিবেশিত তথ্যে আস্থা স্থাপনের আগে সেই তথ্যের সত্যতা যাচাই করার জন্য হ্যালোবিডি.নিউজ পরামর্শ দেয়।
                        </p>
                        </section>

                        {/* Legal Jurisdiction */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">আইন</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            হ্যালোবিডি.নিউজের 'ব্যবহারের শর্তাবলি' এবং গ্রাহকের সঙ্গে তার সম্পর্ক বাংলাদেশের বিদ্যমান আইনের আলোকে পরিচালিত হয়। এ ছাড়া তথ্য সংরক্ষণ, প্রকাশ, ফাঁস বা তারিখ প্রভৃতি নিয়ে বিতর্ক সৃষ্টি হলে তা আর্বিট্রেশন অ্যাক্ট, ২০০১ অনুসারে সালিসের মাধ্যমে নিষ্পত্তি হবে। সালিস অনুষ্ঠিত হবে ঢাকায় এবং ট্রাইব্যুনালের সদস্যসংখ্যা হবে তিন। এর পূর্ণাঙ্গ এখতিয়ার থাকবে আদালতের হাতে। যাঁরা ওয়েবসাইটে প্রবেশ করে সেবা নেবেন বা হ্যালোবিডি.নিউজের অ্যাপ্লিকেশন ব্যবহার করবেন, নাগরিকত্ব, অবস্থান, আবাসস্থল বা ব্যবসাস্থল-নির্বিশেষে তাঁদের ক্ষেত্রে এই নীতিমালা প্রযোজ্য হবে।
                        </p>
                        </section>

                        {/* Unsubscription */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">প্রত্যাহার করা</h2>
                        <p className="text-gray-700 leading-relaxed text-left">
                            কখনো কোনো পাঠক আমাদের বিপণনসংক্রান্ত ইমেইল গ্রহণ করতে না চাইলে প্রতিটি ইমেইলের নিচে আনসাবস্ক্রাইব অপশনে ক্লিক করেই পাঠকেরা তা করতে পারেন। আর পাঠক যদি নিবন্ধিত অ্যাকাউন্ট রাখতে না চান, তাহলে এই ঠিকানায় ইমেইল পাঠালেই চলবে: 
                            <Link href="mailto:info@hellobd.news" className="text-blue-600 hover:text-blue-800 underline mr-2">info@hellobd.news</Link>
                        </p>
                        </section>

                        {/* Correction Policy */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">সংশোধন নীতিমালা</h2>
                        <p className="text-gray-700 leading-relaxed text-left mb-4">
                            আমরা যে পরিমাণে ফিচার হ্যালোবিডি.নিউজের ওয়েব পোর্টালে প্রকাশ করি, তাতে সমস্ত সতর্কতা স্বত্ত্বেও অনিচ্ছাকৃত ভুল থেকে যাওয়া অস্বাভাবিক নয়। অনিচ্ছাকৃত হলেও যেকোনো ভুলের জন্যই আমরা দুঃখিত। ভুল তথ্য সংশোধন করে পাঠককে জানানো সংবাদমাধ্যম হিসেবে আমাদের কর্তব্য। যথাযথ নিয়ম মেনে ভুল সংশোধন ও প্রকাশ করে পাঠকের গোচরে আনি। ভুল নজরে এলে আমরা নিজের উদ্যোগে তা সংশোধন করি। তবে পাঠকের চোখেও কোনো ভুল ধরা পড়লে তাঁরা আমাদের তা জানাতে পারেন। আমরা যাচাই করেসে ভুল সংশোধন করব। আমাদের কাছে এ সংক্রান্ত বার্তা পাঠানোর ঠিকানা: info@hellobd.news
                        </p>
                        <ul className="space-y-3 text-left">
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">কোনো ভুল আমাদের নজরে এলে বা পাঠকেরা জানালে আমরা সংশ্লিষ্ট প্রতিবেদক এবং বিভাগীয় প্রধানকে তা জানাই। এরপর সে তথ্য যাচাই করে ইতিপূর্বে প্রকাশিত সংবাদে সে তথ্য সংশোধন করি।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">১</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">ভুল তথ্য ছাপা পত্রিকা বা অনলাইন যেখানেই প্রকাশিত হোক না কেন, তা হ্যালোবিডি.নিউজের নীতিমালা অনুযায়ী সংশোধন করি। হ্যালোবিডি.নিউজের সামাজিক যোগাযোগ মাধ্যমেও কোনো ভুল তথ্য প্রকাশিত হয়ে থাকলে তা সংশোধন করা হয়।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">২</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">সংশোধিত খবরটির নিচে আমরা সেই সংশোধনের কথা প্রকাশ করি। সেখানে 'সংশোধনী' শিরোনামের নিচে ভুলের কথা জানিয়ে কী সংশোধন করা হয়েছে, তা লিখে দিই। সেখানে সংশোধন করার তারিখ ও সময় উল্লেখ করি।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৩</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">সশোধনী কেবল ভুল তথ্যের ক্ষেত্রেই প্রযোজ্য হয়। ভুল বানান বা বাক্য সংশোধন করা হলে তা জানানো হয় না।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৪</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">আমরা সাধারণত সম্পূর্ণ লেখা প্রত্যাহার করি না। অনিবার্য কারণে সম্পূর্ণ লেখা প্রত্যাহার করা হলে কেবল শিরোনামটি রেখে পুরো লেখা সরিয়ে দেওয়া হয়। এক্ষেত্রে শিরোনামের নিচে লেখাটি অপ্রকাশিত রাখার কারণ আমরা জানিয়ে দিই।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৫</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">প্রকাশিত কোনো সংবাদের প্রতিবাদ এলে আমরা তা সংশ্লিষ্ট প্রতিবেদকের বক্তব্যসহ প্রকাশ করি। তবে প্রতিবাদের সঙ্গে কোনো আইনি বিষয় জড়িত থেকে থাকলে আইনজীবীর সঙ্গে আলোচনা করে ব্যবস্থা নেওয়া হয়।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৬</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">ব্রেকিং নিউজের ক্ষেত্রে সঠিক খবর দেওয়ার প্রক্রিয়াটি ভিন্ন। কোনো কোনো ক্ষেত্রে এ ধরনের খবরে ঘটনার সঙ্গে সঙ্গে তথ্য পরিবর্তিত হতে থাকে; যেমন কোনো দুর্ঘটনায় মৃতের সংখ্যা বা কোনো ঘটনায় অর্থের পরিমাণ বাড়তে বা কমতে পারে। এসব ক্ষেত্রে সংশোধনী প্রকাশ না করে প্রতিবেদনটি নিয়ম অনুযায়ী হালনাগাদ করা হয়।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৭</span>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700 mr-3">সামাজিক যোগাযোগ মাধ্যমে-ফেসবুক, টুইটার, ইনস্টাগ্রাম, টিকটক ইত্যাদিতে-প্রচারিত কোনো লেখা বা গ্রাফিক কার্ডে দেওয়া তথ্য ভুল হলে গুরুত্বভেদে তা সংশোধন বা প্রত্যাহার করা হয়। এক্ষেত্রে আগের লেখা বা কার্ডের স্ক্রিনশটনসহ সংশোধনীটি পাঠকদের পরিবেশন করি।</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex-shrink-0">৮</span>
                            </li>
                        </ul>
                        </section>

                        {/* Comment Policy */}
                        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 pb-2 border-b border-gray-200 text-left">মন্তব্য প্রকাশের নীতিমালা</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">বাংলাদেশের প্রচলিত আইন লঙ্ঘন করে কোনো মন্তব্য করা যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">দেশীয় বা দেশের বাইরের কোনো ব্যক্তি, জাতি, গোষ্ঠী, ভাষা ও ধর্মের প্রতি অবমাননামূলক বা কারও অনুভূতিতে আঘাত দিতে পারে এমন কোনো মন্তব্য করা যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">মন্তব্য অশ্লীল ও অশালীন ইঙ্গিতপূর্ণ কোনো শব্দ, শব্দবন্ধ বা বাক্য ব্যবহার করা যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">কাউকে হেয় প্রতিপন্ন করতে অবমাননামূলকভাবে কোনো প্রাণীবাচক নাম দেওয়া যাবে না, নাম বিকৃত করা যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">কাউকে ব্যক্তিগতভাবে আক্রমণ করা যাবে না, কাউকে ভয় দেখানো বা হুমকি দেওয়া যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">এমন কোনো নাম বা ছদ্মনাম (ইউজার নেম বা নিক) ব্যবহার করা যাবে না যা উদ্দেশ্যমূলক, আপত্তিকর বা ইঙ্গিতপূর্ণ।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">মন্তব্যে কোনো লিংক দেওয়া যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end">
                            <span className="text-gray-700">ইংরেজি হরফে বাংলায় মন্তব্য করা যাবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end md:col-span-2">
                            <span className="text-gray-700">দৃষ্টিকটু বানান ভুল ও অসম্পূর্ণ বা অসংলগ্ন বাক্যের মন্তব্য প্রকাশ করা হবে না।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            </li>
                            <li className="flex items-start justify-end md:col-span-2">
                            <span className="text-gray-700 font-semibold">হ্যালোবিডি.নিউজ কর্তৃপক্ষ যে কোনো মন্তব্য বাতিলের অধিকার রাখে।</span>
                            <svg className="w-5 h-5 text-red-500 ml-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            </li>
                        </ul>
                        </section>
                    </div>
                    </div>
              </div>
            </div>
          </main>
      </Layout>
    </>
  );
}
