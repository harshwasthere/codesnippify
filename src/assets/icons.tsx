type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
    LogoCodesnippify: ({ ...props }: IconProps) => (
        <svg
            {...props}
            id="svg-comp"
            width="100%"
            height="100%"
            fill="#5050ee"
            viewBox="0 0 500 500"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <mask id="globeOuterOnly">
                    <path
                        d="M433.081 65.2949C401.979 65.2949 372.291 77.5065 350.295 99.4933C285.63 164.128 146.668 303.024 87.5399 362.098C70.0162 379.606 60.0004 403.917 60.0004 428.688C59.9911 429.6 60.1638 430.503 60.5082 431.347C60.8526 432.191 61.362 432.957 62.0063 433.602C62.6507 434.246 63.4171 434.755 64.2607 435.1C65.1044 435.444 66.0083 435.617 66.9195 435.607C90.6239 435.607 115.987 425.127 132.73 408.348C212.188 328.718 438.801 102.058 438.823 102.036C438.824 102.035 438.824 102.035 438.825 102.034C439.5 101.361 440 100.496 440 99.5426V72.2141C440.009 71.3028 439.836 70.399 439.492 69.5553C439.147 68.7117 438.638 67.9452 437.994 67.3009C437.349 66.6565 436.583 66.1472 435.739 65.8028C434.896 65.4583 433.992 65.2857 433.081 65.2949ZM390.02 391.912C372.754 409.176 388.072 435.607 412.488 435.607H433.081C433.992 435.617 434.896 435.444 435.739 435.1C436.583 434.755 437.349 434.246 437.994 433.602C438.638 432.957 439.147 432.191 439.492 431.347C439.836 430.503 440.009 429.6 440 428.688V408.239C440 383.803 407.301 374.634 390.02 391.912ZM287.066 384.15C268.077 403.139 281.526 435.607 308.38 435.607C319.798 435.607 332.022 430.491 340.078 422.4C362.29 400.09 407.058 355.31 428.302 334.113C435.625 326.805 440 316.265 440 305.919C440 278.352 406.67 264.546 387.176 284.039L287.066 384.15ZM176.36 384.15C157.371 403.139 170.819 435.607 197.674 435.607C209.092 435.607 221.264 430.572 229.323 422.484C269.366 382.298 390.286 261.368 428.378 223.346C435.7 216.037 440 205.559 440 195.213C440 167.646 406.67 153.84 387.176 173.333L176.36 384.15ZM309.904 120.249C330.183 99.9696 315.82 65.2949 287.141 65.2949C278.6 65.2949 270.482 68.615 264.442 74.6527C228.499 110.579 106.846 232.141 70.4012 268.52C63.7512 275.158 60.0004 284.322 60.0004 293.718C60.0004 321.924 94.103 336.05 114.048 316.105L309.904 120.249ZM199.192 120.255C219.473 99.9731 205.109 65.2949 176.427 65.2949C167.891 65.2949 159.704 68.6851 153.666 74.7187C125.625 102.74 97.5652 130.743 69.4877 158.728C63.4147 164.781 60.0004 173.002 60.0004 181.577C60.0004 210.312 94.7431 224.703 115.062 204.384L199.192 120.255ZM105.042 103.693C120.43 88.3058 106.231 65.2949 84.4698 65.2949H66.9195C66.0083 65.2857 65.1044 65.4583 64.2607 65.8028C63.4171 66.1472 62.6507 66.6565 62.0063 67.3009C61.362 67.9452 60.8526 68.7117 60.5082 69.5553C60.1638 70.399 59.9911 71.3028 60.0004 72.2141V89.7063C60.0004 111.476 89.6477 119.086 105.042 103.693Z"
                        strokeWidth="0"
                    ></path>
                </mask>
            </defs>
            <path
                d="M433.081 65.2949C401.979 65.2949 372.291 77.5065 350.295 99.4933C285.63 164.128 146.668 303.024 87.5399 362.098C70.0162 379.606 60.0004 403.917 60.0004 428.688C59.9911 429.6 60.1638 430.503 60.5082 431.347C60.8526 432.191 61.362 432.957 62.0063 433.602C62.6507 434.246 63.4171 434.755 64.2607 435.1C65.1044 435.444 66.0083 435.617 66.9195 435.607C90.6239 435.607 115.987 425.127 132.73 408.348C212.188 328.718 438.801 102.058 438.823 102.036C438.824 102.035 438.824 102.035 438.825 102.034C439.5 101.361 440 100.496 440 99.5426V72.2141C440.009 71.3028 439.836 70.399 439.492 69.5553C439.147 68.7117 438.638 67.9452 437.994 67.3009C437.349 66.6565 436.583 66.1472 435.739 65.8028C434.896 65.4583 433.992 65.2857 433.081 65.2949ZM390.02 391.912C372.754 409.176 388.072 435.607 412.488 435.607H433.081C433.992 435.617 434.896 435.444 435.739 435.1C436.583 434.755 437.349 434.246 437.994 433.602C438.638 432.957 439.147 432.191 439.492 431.347C439.836 430.503 440.009 429.6 440 428.688V408.239C440 383.803 407.301 374.634 390.02 391.912ZM287.066 384.15C268.077 403.139 281.526 435.607 308.38 435.607C319.798 435.607 332.022 430.491 340.078 422.4C362.29 400.09 407.058 355.31 428.302 334.113C435.625 326.805 440 316.265 440 305.919C440 278.352 406.67 264.546 387.176 284.039L287.066 384.15ZM176.36 384.15C157.371 403.139 170.819 435.607 197.674 435.607C209.092 435.607 221.264 430.572 229.323 422.484C269.366 382.298 390.286 261.368 428.378 223.346C435.7 216.037 440 205.559 440 195.213C440 167.646 406.67 153.84 387.176 173.333L176.36 384.15ZM309.904 120.249C330.183 99.9696 315.82 65.2949 287.141 65.2949C278.6 65.2949 270.482 68.615 264.442 74.6527C228.499 110.579 106.846 232.141 70.4012 268.52C63.7512 275.158 60.0004 284.322 60.0004 293.718C60.0004 321.924 94.103 336.05 114.048 316.105L309.904 120.249ZM199.192 120.255C219.473 99.9731 205.109 65.2949 176.427 65.2949C167.891 65.2949 159.704 68.6851 153.666 74.7187C125.625 102.74 97.5652 130.743 69.4877 158.728C63.4147 164.781 60.0004 173.002 60.0004 181.577C60.0004 210.312 94.7431 224.703 115.062 204.384L199.192 120.255ZM105.042 103.693C120.43 88.3058 106.231 65.2949 84.4698 65.2949H66.9195C66.0083 65.2857 65.1044 65.4583 64.2607 65.8028C63.4171 66.1472 62.6507 66.6565 62.0063 67.3009C61.362 67.9452 60.8526 68.7117 60.5082 69.5553C60.1638 70.399 59.9911 71.3028 60.0004 72.2141V89.7063C60.0004 111.476 89.6477 119.086 105.042 103.693Z"
                strokeWidth="0"
            ></path>
        </svg>
    ),
    LogoShiki: ({ ...props }: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="266"
            height="266"
            viewBox="0 0 266 266"
            fill="none"
            {...props}
        >
            <g>
                <circle cx="219.5" cy="46.5" r="46.5" fill="#CB7676" />
                <rect y="48" width="266" height="65" fill="#4B9978" />
                <path
                    d="M109.463 144.426C109.012 138.792 106.899 134.397 103.124 131.242C99.4052 128.086 93.7426 126.509 86.1361 126.509C81.2905 126.509 77.3182 127.1 74.2192 128.284C71.1766 129.411 68.9228 130.96 67.4579 132.932C65.9929 134.904 65.2323 137.158 65.1759 139.693C65.0632 141.778 65.4295 143.666 66.2747 145.356C67.1762 146.99 68.5848 148.483 70.5005 149.835C72.4162 151.131 74.8672 152.315 77.8535 153.385C80.8397 154.456 84.3894 155.414 88.5026 156.259L102.701 159.301C112.28 161.33 120.478 164.006 127.296 167.33C134.113 170.655 139.692 174.571 144.03 179.078C148.369 183.529 151.552 188.544 153.58 194.122C155.665 199.7 156.736 205.785 156.792 212.378C156.736 223.759 153.89 233.394 148.256 241.283C142.621 249.171 134.564 255.171 124.084 259.285C113.66 263.398 101.124 265.454 86.4742 265.454C71.4302 265.454 58.3019 263.229 47.0893 258.778C35.9331 254.326 27.2561 247.48 21.0582 238.24C14.9166 228.943 11.8177 217.054 11.7613 202.574H56.3862C56.6679 207.87 57.992 212.321 60.3585 215.928C62.725 219.534 66.0493 222.266 70.3315 224.126C74.67 225.985 79.8255 226.915 85.798 226.915C90.8127 226.915 95.0104 226.295 98.391 225.055C101.772 223.816 104.335 222.097 106.082 219.9C107.829 217.702 108.73 215.195 108.787 212.378C108.73 209.73 107.857 207.419 106.167 205.447C104.533 203.419 101.828 201.616 98.053 200.038C94.2779 198.404 89.1787 196.883 82.7554 195.474L65.514 191.756C50.1883 188.431 38.1024 182.881 29.2563 175.106C20.4666 167.274 16.0999 156.597 16.1562 143.074C16.0999 132.087 19.0298 122.48 24.946 114.254C30.9185 105.971 39.1729 99.5197 49.7094 94.8995C60.3021 90.2793 72.4444 87.9691 86.1361 87.9691C100.11 87.9691 112.195 90.3074 122.394 94.984C132.592 99.6606 140.452 106.253 145.974 114.761C151.552 123.213 154.369 133.101 154.426 144.426H109.463Z"
                    fill="#83D0DA"
                />
                <rect x="217" width="266" height="65" transform="rotate(90 217 0)" fill="#E6CC78" />
            </g>
        </svg>
    ),
    ArrowHandDrawn: ({ ...props }: IconProps) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            version="1.1"
            id="Capa_1"
            width="800px"
            height="800px"
            viewBox="0 0 415.262 415.261"
            xmlSpace="preserve"
            {...props}
        >
            <g>
                <path d="M414.937,374.984c-7.956-24.479-20.196-47.736-30.601-70.992c-1.224-3.06-6.12-3.06-7.956-1.224   c-10.403,11.016-22.031,22.032-28.764,35.496h-0.612c-74.664,5.508-146.88-58.141-198.288-104.652   c-59.364-53.244-113.22-118.116-134.64-195.84c-1.224-9.792-2.448-20.196-2.448-30.6c0-4.896-6.732-4.896-7.344,0   c0,1.836,0,3.672,0,5.508C1.836,12.68,0,14.516,0,17.576c0.612,6.732,2.448,13.464,3.672,20.196   C8.568,203.624,173.808,363.356,335.376,373.76c-5.508,9.792-10.403,20.195-16.523,29.988c-3.061,4.283,1.836,8.567,6.12,7.955   c30.6-4.283,58.14-18.972,86.292-29.987C413.712,381.104,416.16,378.656,414.937,374.984z M332.928,399.464   c3.673-7.956,6.12-15.912,10.404-23.868c1.225-3.061-0.612-5.508-2.448-6.12c0-1.836-1.224-3.061-3.06-3.672   c-146.268-24.48-264.996-124.236-309.06-259.489c28.764,53.244,72.828,99.756,116.28,138.924   c31.824,28.765,65.484,54.468,102.204,75.888c28.764,16.524,64.872,31.824,97.92,21.421l0,0c-1.836,4.896,5.508,7.344,7.956,3.672   c7.956-10.404,15.912-20.196,24.48-29.376c8.567,18.972,17.748,37.943,24.479,57.527   C379.44,382.94,356.796,393.956,332.928,399.464z" />
            </g>
        </svg>
    ),
};
