package ru.lanit.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"ru.lanit.service", "ru.lanit.mapper"})
@Import({ PersistenceConfig.class})
public class RootConfig {
}
