package com.example.pilates.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.pilates.adapters.out.MySQLUserAdapter;
import com.example.pilates.application.ports.SQLUserPort;

@Configuration
public class BeanConfiguration {

    // Bean temporário para teste - substitua pela implementação real do adapter
    @Bean
    public SQLUserPort sqlUserPort() {
        return new MySQLUserAdapter();
    }

    // Quando você criar o adapter real que implementa SQLUserPort, 
    // substitua o bean acima por algo como:
    // @Bean
    // public SQLUserPort sqlUserAdapter() {
    //     return new JpaUserAdapter(); // sua implementação real
    // }
}