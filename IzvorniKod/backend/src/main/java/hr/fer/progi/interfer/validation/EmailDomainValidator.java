package hr.fer.progi.interfer.validation;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class EmailDomainValidator {

    public boolean isValid(String email) {
        InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("mailDomains.txt");
        assert inputStream != null;
        Scanner scanner = new Scanner(inputStream, StandardCharsets.UTF_8);

        List<String> lines = new ArrayList<>();
        while (scanner.hasNextLine())
            lines.add(scanner.nextLine());
        scanner.close();

        for (String domain : lines)
            if (email.endsWith(domain))
                return true;
        return false;
    }

}
