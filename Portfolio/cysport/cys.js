// Matrix background effect
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for(let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function drawMatrix() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#00ff00";
            ctx.font = fontSize + "px monospace";
            
            for(let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 35);
        
        // Terminal typing effect
        const commands = [
            "scan_network --target 192.168.1.0/24",
            "analyze_vulnerabilities --report",
            "decrypt_file --algorithm aes-256 --key [REDACTED]",
            "establish_secure_connection --protocol tor",
            "access_darkweb --portal [ENCRYPTED]"
        ];
        
        let commandIndex = 0;
        let charIndex = 0;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseBetweenCommands = 2000;
        
        function typeCommand() {
            const commandElement = document.querySelector('.command:last-child');
            
            if (charIndex < commands[commandIndex].length) {
                commandElement.textContent += commands[commandIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeCommand, typingSpeed);
            } else {
                setTimeout(deleteCommand, pauseBetweenCommands);
            }
        }
        
        function deleteCommand() {
            const commandElement = document.querySelector('.command:last-child');
            
            if (commandElement.textContent.length > 0) {
                commandElement.textContent = commandElement.textContent.slice(0, -1);
                setTimeout(deleteCommand, deletingSpeed);
            } else {
                commandIndex = (commandIndex + 1) % commands.length;
                charIndex = 0;
                setTimeout(typeCommand, 500);
            }
        }
        
        // Start the typing effect after a delay
        setTimeout(typeCommand, 2000);
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

         function toggleExpand(id) {
        const box = document.getElementById(id);
        box.style.display = box.style.display === "block" ? "none" : "block";
    }