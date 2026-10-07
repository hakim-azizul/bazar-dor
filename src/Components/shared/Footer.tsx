import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-white border-t border-gray-100 py-6 px-6 sm:px-12 mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
                {/* Bam pasher text */}
                <div>
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </div>

                {/* Dan pasher text */}
                <div>
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </div>
            </div>
        </footer>
    );
};

export default Footer;